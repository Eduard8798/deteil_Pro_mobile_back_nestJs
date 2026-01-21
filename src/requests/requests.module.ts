import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ServiceRequest} from "../model/ServiceRequest.model";
import {RequestsController} from "./requests.controller";
import {RequestsService} from "./requests.service";

@Module({
    imports: [
        SequelizeModule.forFeature([ServiceRequest])
    ],
    controllers: [RequestsController],
    providers: [RequestsService]
})
export class RequestsModule {}
