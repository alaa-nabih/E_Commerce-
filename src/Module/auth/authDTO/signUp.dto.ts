import { IsEmail, IsInt, IsString, IsStrongPassword, Max, Min } from "class-validator"

export class signUpDto {

  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: 9,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
  }, { message: 'Password is not strong enough' })
  password: string

  @IsStrongPassword()
  confirmPassword: string

  @IsInt()
  @Min(18)
  @Max(60)
  age: string
  
}