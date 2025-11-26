import { Injectable, BadRequestException, UnauthorizedException, Body } from '@nestjs/common';
import bcrypt from 'node_modules/bcryptjs';
import { UserRepo } from 'src/DB/Repos/user.repo'


@Injectable()
export class AuthService {
  constructor(private readonly userRepo: UserRepo) {}

  
  async signup(@Body() body: any) {
    const { name, email, password } = body

    const exist = await this.userRepo.findOne({ email })
    if (exist) throw new BadRequestException('Email already exists')

    const hashed = await bcrypt.hash(password, 10)

    const user = await this.userRepo.create({
      name,
      email,
      password: hashed,
    })

    return {
      message: 'User created successfully',
      user,
    }
  }

  async login(body: any) {
    const { email, password } = body

    const user = await this.userRepo.findOne({ email })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new UnauthorizedException('Invalid credentials')

    return {
      message: 'Logged in successfully',
      user,
    }
  }
}