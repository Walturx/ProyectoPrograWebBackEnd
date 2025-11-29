import Sequelize from 'sequelize'

//Variables
const hostname = 'trabajoprograweb.postgres.database.azure.com';
const username = 'postgres';
const password = 'Administrador!';
const database = 'EcommerceDataBase';
const port = '5432';
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect,
    logging: console.log, // Ver las queries SQL que ejecuta
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
})
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conectado correctamente a Azure PostgreSQL 🚀');
    })
    .catch(err => {
        console.error('❌ Error conectando:', err);
    });
export default sequelize;