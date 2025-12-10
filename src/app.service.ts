import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  appHello(): string {
    return 'Hello World!'
  }
}
