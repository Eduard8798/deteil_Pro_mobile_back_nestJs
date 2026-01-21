import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    Default,
} from 'sequelize-typescript';
import { ServiceRequest } from './ServiceRequest.model';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

@Table({
    tableName: 'users',
    timestamps: true,
})
export class User extends Model<User> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare    id: number;

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

    @HasMany(() => ServiceRequest)
    declare requests: ServiceRequest[];
}
