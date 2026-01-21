import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { ServiceRequest } from './ServiceRequest.model';

@Table({
    tableName: 'services',
    timestamps: true,
})
export class Service extends Model<Service> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare durationMinutes: number;

    @HasMany(() => ServiceRequest)
    declare requests: ServiceRequest[];
}
