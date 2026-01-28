import {BelongsTo, Column, DataType, Default, ForeignKey, Model, Table,} from 'sequelize-typescript';
import {Order} from "./Order.model";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Table({
    tableName: 'users',

})
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    hashPassword: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phone: string;

    @Default(UserRole.USER)
    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
    })
    declare role: UserRole;

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare service_id: number;

    @BelongsTo(() => Order)
    declare service: Order;
}

