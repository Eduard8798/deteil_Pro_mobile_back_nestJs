import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config'
import configurations from "../../configurations";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from "../users/users.module";
import {User} from "../../model/User.model";
import {Order} from "../../model/Order.model";
import {OrderModule} from "../order/order.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
        load: [configurations]
    }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                host: configService.get('db_host'),
                port: configService.get('db_port'),
                username: configService.get('db_user'),
                password: configService.get('db_password'),
                database: configService.get('db_name'),
                synchronize: true,
                autoLoadModels: true,
                models:[User,Order,]


            })
        }),
        UsersModule,
        OrderModule,
        AuthModule,



    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
