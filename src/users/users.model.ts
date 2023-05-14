import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
    first_name: string;
    last_name: string;
    email: string;
    agreed: boolean
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    last_name: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @Column({ type: DataType.INTEGER })
    age: number;

    @Column({ type: DataType.STRING })
    info_source: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    agreed: string
}