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

    @IsInt()
    service_id: number;

}
