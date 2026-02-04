import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "../../model/Order.model";
import {CreateOrderDTO} from "./dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private readonly orderRepository : typeof Order) {
    }

    async createOrder(dto : CreateOrderDTO){

        return await this.orderRepository.create({...dto,url_photo:dto.url});
    }
}
