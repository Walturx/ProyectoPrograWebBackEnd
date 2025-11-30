import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Producto = sequelize.define('producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  marca: {
    type: DataTypes.STRING(100)
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255)
  },

  
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'idcategoria'
  }

}, {
  freezeTableName: true,
  timestamps: false,
  tableName: 'producto'
});

export default Producto;
