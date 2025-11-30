import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const Orden = sequelize.define('orden', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idusuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total: {
        type: DataTypes.DECIMAL(10, 2)
    },
    metododeentrega: {
        type: DataTypes.STRING(100)
    },
    metodopago: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    nrotarjeta: {
        type: DataTypes.STRING(50)
    },
    tipotarjeta: {
        type: DataTypes.STRING(50)
    },
    direccionenvio: {
        type: DataTypes.STRING(255)

    },
    estado: {
        type: DataTypes.STRING(50), defaultValue: 'pendiente'
    }

}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'orden'
});

export default Orden;
