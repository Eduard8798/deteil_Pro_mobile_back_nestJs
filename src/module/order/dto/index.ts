import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDTO {
  @ApiProperty({
    example: 'Interior cleaning and body polishing are needed.',
    description: 'Customer description of the detailing order.',
  })
  @IsString()
  message: string;

  @ApiPropertyOptional({
    example: 'https://example.com/car.jpg',
    description: 'URL of the car photo or another order attachment.',
  })
  @IsOptional()
  @IsString()
  url_photo?: string;
}

export class GetOrderDTO {
  @ApiProperty({
    example: '+380671234567',
    description: 'Customer phone number.',
  })
  @IsString()
  phone: string;
}

export class PatchOrderDTO {
  @ApiPropertyOptional({
    example: 'Please contact me after 18:00.',
    description: 'Updated order description.',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/updated-car.jpg',
    description: 'Updated photo or attachment URL.',
  })
  @IsOptional()
  @IsString()
  url_photo?: string;
}

export class OrderResponseDTO {
  @ApiProperty({
    example: 1,
    description: 'Unique order ID.',
  })
  id: number;

  @ApiProperty({
    example: '+380671234567',
    description: 'Phone number of the user who created the order.',
  })
  phone: string;

  @ApiProperty({
    example: 'Interior cleaning and body polishing are needed.',
    nullable: true,
    description: 'Order description.',
  })
  message: string | null;

  @ApiProperty({
    example: 'https://example.com/car.jpg',
    nullable: true,
    description: 'URL of the car photo or attachment.',
  })
  url_photo: string | null;

  @ApiProperty({
    example: 1,
    description: 'ID of the user who owns the order.',
  })
  user_id: number;

  @ApiProperty({
    example: '2026-09-02T12:00:00.000Z',
    description: 'Order creation date.',
  })
  createdAt: string;

  @ApiProperty({
    example: '2026-09-02T12:00:00.000Z',
    description: 'Order last update date.',
  })
  updatedAt: string;
}
