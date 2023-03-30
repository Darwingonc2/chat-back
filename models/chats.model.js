import  {Model, DataTypes} from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class ChatModel extends Model {}

ChatModel.init( {
        idchat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        idusuario1: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idusuario2:  {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mensaje:  {
            type: DataTypes.STRING(255) ,
            allowNull: false
        },
        hora:  {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        sequelize: DatabaseConfig,
        tableName: 'chats',
        timestamps: false
    }
);
