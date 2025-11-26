import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './Module/auth/auth.module'
import { UserModule } from './Module/user/user.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
ConfigModule.forRoot()//to use process.env variables.

@Module({
  imports: [AuthModule, UserModule, MongooseModule.forRoot(process.env.DATABASE_URL as string, {
  onConnectionCreate: (connection: Connection) => {
    connection.on('connected', () => console.log('connected'));
    connection.on('open', () => console.log('open'));
    connection.on('disconnected', () => console.log('disconnected'));
    connection.on('reconnected', () => console.log('reconnected'));
    connection.on('disconnecting', () => console.log('disconnecting'));

    return connection;
  }
})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}