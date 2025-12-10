import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { User } from 'src/DB/Models/user.model'
import { DBRepo } from './db.repo'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UserRepo extends DBRepo<User> {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super(userModel)
  }

  async findByEmail(email: string) {
    return await this.findOne({ filter: { email } })
  }
}
