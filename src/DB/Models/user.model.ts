import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  name: string

  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String })
  password: string

  @Prop({ type: Number })
  age: number

  @Prop({ type: String })
  gender: string

  @Prop({ type: Boolean, default: false })
  isConfirmed?: boolean

  // @Prop({ type: String })
  // confirmationCode?: string

  // @Prop({ type: Date })
  // confirmationExpires?: Date

  // @Prop({ type: String })
  // resetPasswordCode?: string

  // @Prop({ type: Date })
  // resetPasswordExpires?: Date

  // @Prop({ type: Boolean, default: false })
  // isGoogleUser?: boolean
}

export const UserSchema = SchemaFactory.createForClass(User)
export const UserModel = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
])
