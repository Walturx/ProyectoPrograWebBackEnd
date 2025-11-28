import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const CarritoDeCompra = sequelize.define('carritodecompra', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    creadoen: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    actualizadoen: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }

}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'carritodecompra'
});

export default CarritoDeCompra;
