import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-access-token',
    description:
      'Short-lived JWT access token. Pass it in the Authorization header as Bearer <token> for protected endpoints.',
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-refresh-token',
    description:
      'JWT refresh token used to issue a new token pair through POST /auth/refresh.',
  })
  refreshToken: string;
}

export class RefreshTokenDTO {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example-refresh-token',
    description: 'Refresh token received after login or registration.',
  })
  refreshToken: string;
}
