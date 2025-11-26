import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.services'
import type  { Request } from 'express'
import { TestPipe } from 'src/common/pipes/test.pipe'
import { signUpDto } from './authDTO/signUp.dto'


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
async signup(@Body() body: signUpDto) {//using ParseIntPipe to automatically convert the id query parameter to an integer.  
    return 'Done'
}

@Get('/test')
async test() {
    return this.authService.test()
}

}
