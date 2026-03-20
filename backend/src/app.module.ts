import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './api/chat/chat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rohanpasdigitech_db_user:OQZeF6Poc4zqbOES@linkshortener.rz4h2tg.mongodb.net/?appName=LinkShortener',
    ),
    ChatModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
