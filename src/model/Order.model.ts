import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "./User.model";


interface OrderCreateAttrs {
    phone : string,
    message:string,
    url_photo:string;
}

@Table({
    tableName: 'order',

})

export class Order extends Model <Order, OrderCreateAttrs> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare message: string

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare url_photo: string

    @HasMany(() => User)
    declare users: User[];
}
