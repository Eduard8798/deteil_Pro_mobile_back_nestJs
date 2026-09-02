import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDTO, LoginDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../model/User.model';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
  id: number;
  name: string;
  phone: string;
  role: UserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = this.validateUser(loginDto);
    return this.generateToken(await user);
  }

  async registration(userDto: CreateUserDTO) {
    const candidate = await this.userService.getUserByPhone(userDto.phone);
    if (candidate) {
      throw new HttpException(
        'a user with that name already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.createUser({
      ...userDto,
    });
    return this.generateToken(user);
  }

  private generateToken(user: JwtPayload) {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('secret_jwt'),
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow<string>('refresh_jwt'),
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.getOrThrow<string>('refresh_jwt'),
      });

      const user = await this.userService.getUserByPhone(payload.phone);

      if (!user) {
        throw new UnauthorizedException();
      }

      return this.generateToken(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByPhone(loginDto.phone);

    if (!user || !user.hashPassword) {
      throw new UnauthorizedException({ message: 'uncorrected data' });
    }
    const passwordEquals = await bcrypt.compare(
      loginDto.password,
      user.hashPassword,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'uncorrected number or password',
      });
    }

    return user;
  }
}
