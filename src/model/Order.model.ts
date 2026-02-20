import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { User } from './User.model';

interface OrderCreateAttrs {
    phone: string;
    message?: string;
    url_photo?: string;
    user_id: number;
}

@Table({
    tableName: 'orders',
})
export class Order extends Model<Order, OrderCreateAttrs> {

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
    declare message: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare url_photo: string;


    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare user_id: number;


    @BelongsTo(() => User)
    declare user: User;
}
