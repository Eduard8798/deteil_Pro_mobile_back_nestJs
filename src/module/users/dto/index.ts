import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { UserRole } from '../../../model/User.model';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Alex',
    description: 'User name displayed in the profile.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+380671234567',
    description: 'User phone number in Ukrainian international format.',
    pattern: '^\\+380\\d{9}$',
  })
  phone: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password. Minimum length is 8 characters.',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiHideProperty()
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class LoginDto {
  @ApiProperty({
    example: '380671234567',
    description: 'User phone number in +380XXXXXXXXX format.',
    pattern: '^\\380\\d{9}$',
  })
  phone: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password.',
    minLength: 8,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO {
  @ApiPropertyOptional({
    example: 'Jack',
    description: 'New user name.',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    example: '380671234567',
    description: 'New phone number in 380XXXXXXXXX format.',
    pattern: '^\\+380\\d{9}$',
  })
  @IsOptional()
  phone?: string;
}

export class ChangeRoleDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user whose role should be changed.',
  })
  userId: number;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'New user role.',
  })
  role: UserRole;
}
export class UpdateUserPassword {
  @ApiProperty({
    example: '380671234567',
    description: 'Phone number of the user.',
  })
  phone: string;

  @ApiProperty({
    example: 'NewSecurePassword123!',
    description: 'New password. Minimum 4 characters.',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}

export class UserResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique user ID.',
  })
  id: number;

  @ApiProperty({
    example: 'Alex',
    nullable: true,
    description: 'User name.',
  })
  name: string | null;

  @ApiProperty({
    example: '+380671234567',
    description: 'Unique user phone number.',
  })
  phone: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'User role in the system.',
  })
  role: UserRole;

  @ApiProperty({
    example: '2026-09-02T12:00:00.000Z',
    description: 'User record creation date.',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-09-02T12:00:00.000Z',
    description: 'User record last update date.',
  })
  updatedAt: string;
}

export class UserSummaryDTO {
  @ApiProperty({
    example: 'Alex',
    nullable: true,
    description:
      'Authenticated user name. The full order list is available through GET /order.',
  })
  name: string | null;
}

export class MessageResponseDTO {
  @ApiProperty({
    example: 'delete done!',
    description: 'Text result of the operation.',
  })
  message: string;
}
