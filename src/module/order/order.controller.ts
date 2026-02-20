import {Body, Controller, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {OrderService} from "./order.service";
import {CreateOrderDTO, GetOrderDTO, PatchOrderDTO} from "./dto";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../guards/jwt-guard";

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getOrdes(@Req() req){
        return await this.orderService.getOrdes(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-order')
    createOrder(@Body() dto: CreateOrderDTO,
                @Req() req) {
        return this.orderService.createOrder(dto, req.user.id, req.user.phone);
    }


    @Get(':id')
    getOrderId(@Param('id') id : number) {
        return this.orderService.getOrderId(id);
    }


    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async patchOrderId(@Param('id') id: number,
                       dto: PatchOrderDTO
    ) {
        return await this.orderService.patchOrderId(dto, id)
    }
}
