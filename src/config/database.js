import Sequelize from 'sequelize';
import pg from 'pg'; // Asegúrate de instalar pg: npm i pg

// Variables de conexión
const hostname = 'trabajoprograweb.postgres.database.azure.com';
const username = 'postgres';
const password = 'Administrador!';
const database = 'EcommerceDataBase';
const port = 5432;
const dialect = 'postgres';

// Crear instancia de Sequelize usando pg como módulo
const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    dialectModule: pg,
    logging: console.log,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

// Probar la conexión
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado correctamente a Azure PostgreSQL 🚀');
    })
    .catch(err => {
        console.error('❌ Error conectando:', err);
    });

export default sequelize;
