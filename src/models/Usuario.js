import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Usuario = sequelize.define('usuario', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    dni: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },

    fecharegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    estado: {
        type: DataTypes.STRING(50),
        defaultValue: 'activo'
    },

    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true
    },

    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: true
    }

}, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'usuario'
});

export default Usuario;
