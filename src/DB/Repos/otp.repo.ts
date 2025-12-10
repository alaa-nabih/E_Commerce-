import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { DBRepo } from './db.repo'
import { InjectModel } from '@nestjs/mongoose'
import { OTP } from '../Models/otp.model'

@Injectable()
export class otpRepo extends DBRepo<OTP> {
  constructor(@InjectModel(OTP.name) private OTPModel: Model<OTP>) {
    super(OTPModel)
  }
}
