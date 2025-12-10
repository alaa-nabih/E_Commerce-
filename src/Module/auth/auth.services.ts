import {
  Injectable,
  BadRequestException,
  Body,
  NotFoundException,
} from '@nestjs/common'
import { UserRepo } from 'src/DB/Repos/user.repo'
import { User } from 'src/DB/Models/user.model'
import { compareHash, createHash } from 'src/common/utils/security/hash'
import { OTPService } from 'src/common/utils/email/createOtp'
import { OTPTypeEnum } from 'src/DB/Models/otp.model'
import { template } from 'src/common/utils/email/generateHtml'
import {
  EMAIL_EVENTS_ENUM,
  emailEmitter,
} from 'src/common/utils/email/emailEvents'
import { jwtService } from 'src/common/utils/security/token'

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly otpService: OTPService,
    private readonly jwt: jwtService,
  ) {}

  async signup(@Body() body: User) {
    const { name, email, password, age, gender } = body

    const existingUser = await this.userRepo.findByEmail(email)
    if (existingUser) {
      throw new BadRequestException('Email already in use')
    }

    const user = await this.userRepo.create({
      data: {
        name,
        email,
        password: await createHash(password),
        age,
        gender,
      },
    })

    const otp = await this.otpService.createOTP({
      userId: user._id,
      type: OTPTypeEnum.VERIFY_EMAIL,
    })

    const html = template({
      code: otp,
      name: user.name,
      subject: 'verify your email',
    })

    emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
      to: email,
      subject: 'verify your email',
      html,
    })

    return {
      message: 'User registered successfully',
      user,
    }
  }

  async confirmEmail(data: { email: string; otp: string }) {
    const isEmailExist = await this.userRepo.findByEmail(data.email)
    if (!isEmailExist) {
      throw new NotFoundException('email not found')
    }
    await this.otpService.validateOtp({
      otp: data.otp,
      userId: isEmailExist._id,
      type: OTPTypeEnum.VERIFY_EMAIL,
    })
    isEmailExist.isConfirmed = true

    return {
      msg: 'success',
      data: {},
    }
  }

  async resendOtp(data: { email: string }) {
    const isEmailExist = await this.userRepo.findByEmail(data.email)
    if (!isEmailExist) {
      throw new NotFoundException('user not found')
    }
    if (isEmailExist.isConfirmed) {
      throw new BadRequestException('email already verified')
    }
    const otp = await this.otpService.createOTP({
      type: OTPTypeEnum.VERIFY_EMAIL,
      userId: isEmailExist._id,
    })
    const html = template({
      code: otp,
      name: isEmailExist.name,
      subject: 'verify your email',
    })
    emailEmitter.publish(EMAIL_EVENTS_ENUM.VERIFY_EMAIL, {
      to: isEmailExist.email,
      subject: 'verify your email',
      html,
    })

    return {
      data: {},
      msg: '',
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) {
      throw new BadRequestException('invalid credentials')
    }
    if (!(await compareHash(password, user.password))) {
      throw new BadRequestException('invalid credentials')
    }
    const payload = {
      _id: user._id,
      email: user.email,
    }
    const token = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: process.env.SECRET_KEY,
    })
  }

}