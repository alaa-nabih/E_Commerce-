import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/Models/user.model";

@Injectable()
export class UserRepo {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return this.userModel.find()
  }

  async findOne(filter: any) {
    return this.userModel.findOne(filter)
  }

  async findById(id: string) {
    return this.userModel.findById(id)
  }

  async create(data: Partial<User>) {
    return this.userModel.create(data)
  }

  async update(id: string, data: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true })
  }

  async delete(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}
