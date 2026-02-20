import {
    Column,
    DataType,
    Default,
    HasMany,
    Model,
    Table
} from 'sequelize-typescript';
import { Order } from './Order.model';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

interface UserCreationAttrs {
    name?: string;
    phone: string;
    hashPassword: string;
    role?: UserRole;
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
        unique: true,
    })
    declare phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare hashPassword: string;

    @Default(UserRole.USER)
    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        allowNull: false,
        defaultValue: UserRole.USER,
    })
    declare role: UserRole;


    @HasMany(() => Order)
    declare orders: Order[];
}
