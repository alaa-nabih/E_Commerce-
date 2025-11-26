import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule) //this line equal => const app=express() 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //strip properties that do not have any decorators in the DTO
    forbidNonWhitelisted: true, //throw error if non-whitelisted properties are present
  })) 
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()