import {IsString} from "class-validator";

export class CreateOrderDTO {
    @IsString()
    phone: string;

    @IsString()
    message: string;

    @IsString()
    url: string;

}
