import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String })
  password: string; 

  @Prop({ type: Number })
  age: number
  
  @Prop({ type: Boolean, default: false })
  isConfirmed: boolean;

  @Prop({ type: String })
  confirmationCode: string;

  @Prop({ type: Date })
  confirmationExpires: Date;
//https://github.com/Hajar-Elewa/Assigment17
  @Prop({ type: String })
  resetPasswordCode: string;

  @Prop({ type: Date })
  resetPasswordExpires: Date;

  @Prop({ type: Boolean, default: false })
  isGoogleUser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)