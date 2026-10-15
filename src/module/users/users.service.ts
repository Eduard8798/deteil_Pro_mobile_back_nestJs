import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../../model/User.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 4);
    } catch (e) {
      throw new Error(e);
    }
  }

  async createUser(dto: CreateUserDTO) {
    try {
      const hashPassword = await this.hashPassword(dto.password);

      return await this.userRepository.create({
        ...dto,
        hashPassword: hashPassword,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getUserByPhone(phone: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { phone },
        include: { all: true },
      });
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get user');
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        include: { all: true },
      });
      return {
        name: user?.name,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get user');
    }
  }

  async getOrderList(user: { id: number; role: string }) {
    try {
      if (user.role === 'ADMIN') {
        return this.userRepository.findAll({
          attributes: ['id', 'name', 'phone', 'role'],
        });
      }
      const response = await this.userRepository.findAll({
        attributes: ['id', 'name', 'phone', 'role'],
      });
      return {
        response,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to get user list');
    }
  }

  async updateUser(dto: UpdateUserDTO, updateUserId: number) {
    try {
      await this.userRepository.update(dto, {
        where: { id: updateUserId },
      });
      const updateUser = await this.userRepository.findByPk(updateUserId, {
        attributes: { exclude: ['hashPassword'] },
      });
      return updateUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(UserId: number, id: number) {
    try {
      const admin = await this.userRepository.findByPk(UserId);

      if (admin?.role === 'ADMIN') {
        await this.userRepository.destroy({
          where: { id: id },
        });
      } else {
        return { message: 'you can`t delete user , because you are not admin' };
      }

      return { message: 'delete done!' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
