import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.services'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from 'src/Models/user.model'


@Module({
  imports:[MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      }
    ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}