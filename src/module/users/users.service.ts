import {Injectable} from '@nestjs/common';
import {User} from "../../model/User.model";
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from 'bcrypt';
import {CreateUserDTO} from "./dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    async hashPassword(password: string) : Promise<string> {
        try {
            return bcrypt.hash(password, 4)
        }
        catch (e){
            throw new Error(e)
        }
    }

    async createUser (dto : CreateUserDTO) {

        const hashPassword = await this.hashPassword(dto.password);

        return await this.userRepository.create({
            ...dto,
            hashPassword: hashPassword
        });

    }
}


