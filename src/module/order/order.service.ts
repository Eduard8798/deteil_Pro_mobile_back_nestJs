import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "../../model/Order.model";
import {CreateOrderDTO, PatchOrderDTO} from "./dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private readonly orderRepository: typeof Order) {
    }

    async createOrder(dto: CreateOrderDTO, id: number, phone: string) {

        return await this.orderRepository.create({...dto, phone: phone, user_id: id});
    }

    async getOrderId(id: number) {
        return await this.orderRepository.findByPk(id);

    }

    async patchOrderId(dto: PatchOrderDTO, id: number) {

        const order = await this.orderRepository.findByPk(id);

        await order?.update(dto);

        return order;
    }

    async getOrdes(user_id : number) {
        const roleUser = await this.orderRepository.findByPk(user_id)

        if (roleUser?.user.role === 'ADMIN'){
            return await this.orderRepository.findAll({

            })
        }
        else {
            return await this.orderRepository.findAll({
                where: {user_id}, include: {all: true},
            });
        }


    }
}
