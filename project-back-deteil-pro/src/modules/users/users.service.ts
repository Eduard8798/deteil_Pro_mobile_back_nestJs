import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./models/user.model";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "./dto";
@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository : typeof User) {
    }

    async hashPassword (password : string) {
        return bcrypt.hash(password,4)
    }


    async createUser(dto: CreateUserDTO): Promise<User> {
        dto.password = await this.hashPassword(dto.password);

        const user = await this.userRepository.create({
            ...dto
        });

        return user;
    }


}
