import  {Model, DataTypes} from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class UserModel extends Model {}

UserModel.init( {
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(40),
            allowNull: true,
        },
        apellido:  {
            type: DataTypes.STRING(40) ,
            allowNull: true
        },
        correo:  {
            type: DataTypes.STRING(40) ,
            allowNull: true
        },
        password:  {
            type: DataTypes.STRING(40) ,
            allowNull: true
        },
        activo:  {
            type: DataTypes.STRING(1) ,
            allowNull: false
        },

    }, {
        sequelize: DatabaseConfig,
        tableName: 'usuario',
        timestamps: false
    }
);
