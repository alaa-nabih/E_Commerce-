import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { User } from './user.model'

export enum OTPTypeEnum {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

@Schema({
  timestamps: true,
})
export class OTP {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  userId: Types.ObjectId

  @Prop({
    type: String,
    required: true,
  })
  otp: string

  @Prop({
    type: String,
    required: true,
    enum: Object.values(OTPTypeEnum),
  })
  type: OTPTypeEnum

  @Prop({
    type: Date,
    required: true,
  })
  expireAt: Date
}

export type OTPDocument = HydratedDocument<OTP>

export const OTPSchema = SchemaFactory.createForClass(OTP)
OTPSchema.index(
  {
    userId: 1,
    type: 1,
  },
  {
    unique: true, //the combination of userId and type should be unique
    expires: 1000 * 60 * 5, // 5 minutes
    expireAfterSeconds: 300, //after expires date ,count 300 seconds to delete
  },
)

export const OTPModel = MongooseModule.forFeature([
  {
    name: OTP.name,
    schema: OTPSchema,
  },
])
