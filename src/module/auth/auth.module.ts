import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../../strategy";
import {PassportModule} from "@nestjs/passport";
import {jwtConfig} from "./jwt/jwt.config";

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports: [
      UsersModule,PassportModule,
      JwtModule.registerAsync(jwtConfig)
  ]
})
export class AuthModule {}
