import {Body, Controller, Post} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDTO} from "./dto";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @Post('create-order')
    createOrder(@Body() dto: CreateOrderDTO){
        return this.orderService.createOrder(dto);
    }
}
