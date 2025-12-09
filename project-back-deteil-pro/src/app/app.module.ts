import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "../users/users.module";
import {ConfigModule} from "@nestjs/config";
import configurations from "../configurations";
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    load: [configurations]
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
