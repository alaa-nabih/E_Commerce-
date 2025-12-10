import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.services'
import { UserRepo } from 'src/DB/Repos/user.repo'
import { otpRepo } from 'src/DB/Repos/otp.repo'
import { OTPModel } from 'src/DB/Models/otp.model'
import { UserModel } from 'src/DB/Models/user.model'
import { OTPService } from 'src/common/utils/email/createOtp'
import { jwtService } from 'src/common/utils/security/token'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [UserModel, OTPModel],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepo,
    otpRepo,
    OTPService,
    jwtService,
    JwtService,
  ],
})
export class AuthModule {}
