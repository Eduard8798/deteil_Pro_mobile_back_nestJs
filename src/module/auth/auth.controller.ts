import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateUserDTO, LoginDto } from '../users/dto';
import { AuthTokensDTO, RefreshTokenDTO } from './dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description:
      'Validates the user phone number and password. Returns a JWT token pair after successful authentication.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({
    type: AuthTokensDTO,
    description: 'The user has been authenticated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid phone number or password.',
  })
  login(@Body() loginDto: LoginDto) {
    console.log('data-login',loginDto)
    return this.authService.login(loginDto);
  }

  @Post('registration')
  @ApiOperation({
    summary: 'User registration',
    description:
      'Creates a new customer account using name, phone number, and password. Returns an access token and a refresh token after registration.',
  })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({
    type: AuthTokensDTO,
    description: 'The user has been registered successfully.',
  })
  @ApiBadRequestResponse({
    description: 'A user with this phone number already exists.',
  })
  registration(@Body() userDto: CreateUserDTO) {
    return this.authService.registration(userDto);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Accepts a valid refresh token and returns a new JWT token pair.',
  })
  @ApiBody({ type: RefreshTokenDTO })
  @ApiOkResponse({
    type: AuthTokensDTO,
    description: 'Tokens have been refreshed successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'The refresh token is invalid or expired.',
  })
  refresh(@Body() dto: RefreshTokenDTO) {
    return this.authService.refresh(dto.refreshToken);
  }
}
