import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from '../../model/Order.model';
import { CreateOrderDTO, PatchOrderDTO } from './dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
  ) {}

  async createOrder(dto: CreateOrderDTO, id: number, phone: string) {
    try {
      return await this.orderRepository.create({
        ...dto,
        phone: phone,
        user_id: id,
      });
    }
    catch (e){
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async getOrderId(id: number) {
   try {
     const order = await this.orderRepository.findByPk(id);

     if (!order) {
       throw new NotFoundException(`Order with id ${id} not found`);
     }

     return order;
   } catch (error) {
     if (error instanceof HttpException) {
       throw error;
     }
     throw new InternalServerErrorException('Failed to get order');
   }
  }

  async patchOrderId(dto: PatchOrderDTO, id: number) {
   try {
     const order = await this.orderRepository.findByPk(id);

     if (!order) {
       throw new NotFoundException(`Order with id ${id} not found`);
     }

     return await order.update(dto);
   }
   catch (error){
     if (error instanceof HttpException) {
       throw error;
     }

     throw new InternalServerErrorException('Failed to update order');
   }
  }

  async getOrdes(user: { id: number; role: string }) {
    try {
      if (user.role === 'ADMIN') {
        return await this.orderRepository.findAll({
          attributes: ['id', 'phone', 'message', 'url_photo'],
          include: [
            {
              association: 'user',
              attributes: ['id', 'name'],
            },
          ],
        });
      }

      return await this.orderRepository.findAll({
        where: {
          user_id: user.id,
        },
        attributes: ['id', 'phone', 'message', 'url_photo'],
        include: [
          {
            association: 'user',
            attributes: ['id', 'name'],
          },
        ],
      });
    }
    catch (error){
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get orders');
    }
  }

  async deleteOrder(id: number) {
    try {
      const order = await this.orderRepository.findByPk(id);

      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }

      await order.destroy();

      return {
        message: 'Order deleted successfully',
        id: order.id,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete order');
    }
  }
}
