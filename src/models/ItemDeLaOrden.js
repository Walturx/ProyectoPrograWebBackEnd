import sequelize from '../config/database.js'
import { DataTypes } from 'sequelize'

const ItemDeLaOrden = sequelize.define('itemdelaorden', {

    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    idorden: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    idproducto: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    cantidad: { 
        type: DataTypes.INTEGER, 
        allowNull: false, defaultValue: 1 
    },
    preciounitario: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    }

}, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'itemdelaorden'
});

export default ItemDeLaOrden;
