import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../../model/Order.model';
import { CreateOrderDTO, PatchOrderDTO } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
  ) {}

  async createOrder(dto: CreateOrderDTO, id: number, phone: string) {
    return await this.orderRepository.create({
      ...dto,
      phone: phone,
      user_id: id,
    });
  }

  async getOrderId(id: number) {
    const order = await this.orderRepository.findByPk(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async patchOrderId(dto: PatchOrderDTO, id: number) {
    const order = await this.orderRepository.findByPk(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return await order.update(dto);
  }

  async getOrdes(user_id: number) {
    return await this.orderRepository.findAll({
      where: { user_id },
      attributes: ['id', 'phone', 'message', 'url_photo'],
      include: [
        {
          association: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });
  }
}
