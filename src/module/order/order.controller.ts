import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { OrderService } from './order.service';
import { CreateOrderDTO, OrderResponseDTO, PatchOrderDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOperation({
    summary: 'User order list',
    description:
      'Returns all detailing orders that belong to the authenticated user.',
  })
  @ApiOkResponse({
    type: OrderResponseDTO,
    isArray: true,
    description: 'The order list has been retrieved successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  async getOrdes(@Req() req) {
    return await this.orderService.getOrdes(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Post('create-order')
  @ApiOperation({
    summary: 'Create order',
    description:
      'Creates a new detailing order for the authenticated user. phone and user_id are taken from the JWT token.',
  })
  @ApiBody({ type: CreateOrderDTO })
  @ApiCreatedResponse({
    type: OrderResponseDTO,
    description: 'The order has been created successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  createOrder(@Body() dto: CreateOrderDTO, @Req() req) {
    return this.orderService.createOrder(dto, req.user.id, req.user.phone);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Returns one order by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Order ID.',
  })
  @ApiOkResponse({
    type: OrderResponseDTO,
    description: 'The order has been retrieved successfully.',
  })
  @ApiNotFoundResponse({
    description: 'The order was not found.',
  })
  getOrderId(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderId(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Patch(':id')
  @ApiOperation({
    summary: 'Update order',
    description: 'Updates the description or photo URL of an existing order.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'Order ID.',
  })
  @ApiBody({ type: PatchOrderDTO })
  @ApiOkResponse({
    type: OrderResponseDTO,
    description: 'The order has been updated successfully.',
  })
  @ApiUnauthorizedResponse({
    description: 'Bearer token is missing or invalid.',
  })
  @ApiNotFoundResponse({
    description: 'The order was not found.',
  })
  async patchOrderId(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PatchOrderDTO,
  ) {
    return await this.orderService.patchOrderId(dto, id);
  }
}
