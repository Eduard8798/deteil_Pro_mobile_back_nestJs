import {Injectable} from '@nestjs/common';
import {User} from "../../model/User.model";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO, UpdateUserDTO} from "./dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    async hashPassword(password: string): Promise<string> {
        try {
            return bcrypt.hash(password, 4)
        } catch (e) {
            throw new Error(e)
        }
    }

    async createUser(dto: CreateUserDTO) {

        const hashPassword = await this.hashPassword(dto.password);

        return await this.userRepository.create({
            ...dto,
            hashPassword: hashPassword
        });

    }

    async getUserByPhone(phone: string) {
        const user = await this.userRepository.findOne(
            {where: {phone}, include: {all: true}}
        )
        return user;
    }

    async getOrderList(id: number) {

        const user = await this.userRepository.findOne({
            where: {id: id}, include: {all: true}
        })
        return {
            name: user?.name,
            // service: user?.service
        };
    }

    async updateUser(dto: UpdateUserDTO, updateUserId: number) {
        await this.userRepository.update(dto, {
            where: {id: updateUserId}
        })
        const updateUser = await this.userRepository.findByPk(updateUserId)
        return updateUser;
    }

    async deleteUser(UserId: number,id : number) {

        const admin = await this.userRepository.findByPk(UserId)

        if (admin?.role === 'ADMIN'){
            await this.userRepository.destroy({
                where: {id: id}
            })
        }
        else {
            return {message: 'you can`t delete user , because you are not admin'}
        }

        return {message: "delete done!"}
    }
}


