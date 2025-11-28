import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const ItemDeCarrito = sequelize.define('itemdecarrito', {

    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    idcarrito: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    idproducto: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 1 
    }

}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'itemdecarrito'
});

export default ItemDeCarrito;
