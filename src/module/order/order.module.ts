import {Module} from '@nestjs/common';
import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";
import {Order} from "../../model/Order.model";
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    controllers:[OrderController],
    providers:[OrderService],
    imports:[
        SequelizeModule.forFeature([Order])
    ]
})
export class OrderModule {}
