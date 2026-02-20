import {IsEnum, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsString} from "class-validator";
import {UserRole} from '../../../model/User.model'
export class CreateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;


}

export class LoginDto {
    phone: string;
    password: string;
}

export class UpdateUserDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPhoneNumber()
    phone: string;


}

export class ChangeRoleDto {
    userId: number;
    role: UserRole;
}
