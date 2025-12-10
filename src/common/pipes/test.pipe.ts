import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { signUpDto } from 'src/Module/auth/authDTO/signUp.dto'

@Injectable()
export class TestPipe implements PipeTransform {
  transform(value: signUpDto, metadata: ArgumentMetadata) {
    console.log({ value, metadata })

    if (value.password !== value.confirmPassword) {
      throw new BadRequestException(
        'Password and Confirm Password do not match',
      )
    }
  }
}
