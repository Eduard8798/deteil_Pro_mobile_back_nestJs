import {IsNumber, IsString} from "class-validator";

export class CreateOrderDTO {
    @IsString()
    phone?: string;

    @IsString()
    message: string;

    @IsString()
    url: string;

    @IsNumber()
    user_id: number;

}

export class GetOrderDTO {
    @IsString()
    phone: string;
}

export class PatchOrderDTO {
    @IsString()
    message?: string;

    @IsString()
    url?: string;
}

