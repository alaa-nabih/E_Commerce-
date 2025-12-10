import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.services'
import { signupSchema } from './authValidation/signup.schema'
import { ZodPipe } from 'src/common/pipes/zod.pipe'
import { signUpDto } from './authDTO/signUp.dto'
import { AuthGuard } from 'src/common/guards/auth.guard'

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get(':id')
  // authHello(@Req() req: Request) {//@Req() decorator to access the request object to log request details.
  //   console.log({params : req.params})

  //   @Get(':id/:name')//the same i query params can be accessed using @Query & @Headers decorator
  //     authHello(@Param('name') name: any, @Param('id') id: string) {
  //     console.log({ name, id }); // { name: 'anas', id: '10' }
  //     return `Hello ${name} with ID: ${id}`
  // }

  @Post('signup')
  @UsePipes(new ZodPipe(signupSchema))
  async signup(@Body() data: signUpDto) {
    return this.authService.signup(data)
  }

  @Post('confirmEmail')
  async confirmEmail(@Body() { otp, email }: { otp: string; email: string }) {
    return this.authService.confirmEmail({
      email,
      otp,
    })
  }

  @Post('resed-otp')
  async resendOtp(@Body() { email }) {
    return this.authService.resendOtp({ email })
  }

  @Post('login')
  async login( @Body() { email, password }: { email: string; password: string }) {
    return this.authService.login({
      email,
      password,
    })
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors()
   async me(@Req() { user }) {
    return { data: user }
}

}
