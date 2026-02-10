import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDTO, LoginDto} from "../users/dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserRole} from "../../model/User.model";
import * as bcrypt from 'bcrypt';

export interface JwtPayload {
    id: number;
    name: string;
    phone: string;
    role: UserRole;
    service_id: number;
}

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
                private jwtService: JwtService) {
    }


    // async login(userDto: CreateUserDTO) {
    //     const user = this.validateUser(userDto)
    //     return this.generateToken(await user)
    // }
    async login(loginDto: LoginDto) {
        console.log('loginMethod - loginDataDTO:',loginDto)
        const user = this.validateUser(loginDto)
        return this.generateToken(await user)
    }


    async registration(userDto: CreateUserDTO) {
        const candidate = await this.userService.getUserByPhone(userDto.phone);
        if (candidate) {
            throw new HttpException('a user with that name already exists', HttpStatus.BAD_REQUEST)
        }
        const user = await this.userService.createUser({
            ...userDto,

        })
        return this.generateToken(user)
    }

    private generateToken(user: JwtPayload) {
        console.log('generateTokenMethod - user:',user)
        const payload = {
            name: user.name,
            phone: user.phone,
            role: user.role,
            id_service: user.service_id
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(loginDto: LoginDto) {
        const user = await this.userService.getUserByPhone(loginDto.phone);

        console.log('validateUserMethod - validateUserDataDTO:',loginDto)

        if (!user || !user.hashPassword) {
            console.log("user: - ",user)
            console.log("user.hashPassword: - ",user?.hashPassword)
            throw new UnauthorizedException({message: 'uncorrected data'})
        }
        const passwordEquals = await bcrypt.compare(
            loginDto.password, user.hashPassword
        );
        if (!passwordEquals) {
            throw new UnauthorizedException({message: 'uncorrected number or password'})
        }
        console.log('validateUserMethoduser - user:',user)
        return user;
    }
}


