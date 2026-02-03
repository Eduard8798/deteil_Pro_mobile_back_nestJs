import {BelongsTo, Column, DataType, Default, ForeignKey, Model, Table,} from 'sequelize-typescript';
import {Order} from "./Order.model";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

interface UserCreationAttrs {
    name?: string,
    phone: string,
    hashPassword: string,
    role?: UserRole,
    service_id: number
}

@Table({
    tableName: 'users',

})
export class User extends Model<User, UserCreationAttrs> {

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
    declare name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hashPassword: string;

    @Default(UserRole.USER)
    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: true,
        defaultValue: UserRole.USER
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

