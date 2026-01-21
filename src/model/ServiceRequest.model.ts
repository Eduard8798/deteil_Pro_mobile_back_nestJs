import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import { User } from './User.model'
import { Service } from './Service.model';

export enum RequestStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
    CANCELED = 'CANCELED',
}

@Table({
    tableName: 'requests',
    timestamps: true,
})
export class ServiceRequest extends Model<ServiceRequest> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    declare userId: number;

    @ForeignKey(() => Service)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare serviceId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare clientName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare clientPhone: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    declare carModel: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare comment: string;

    @Default(RequestStatus.NEW)
    @Column({
        type: DataType.ENUM(...Object.values(RequestStatus)),
    })
    declare status: RequestStatus;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Service)
    declare service: Service;
}
