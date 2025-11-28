import Sequelize from 'sequelize'

//Variables
const hostname = 'localhost';
const username = 'postgres';
const password = 'Gustabo088';
const database = 'EcommerceDataBase';
const port = '5432';
const dialect = 'postgres';

const sequelize = new Sequelize(database, username, password, {
    host: hostname,
    port: port,
    dialect: dialect
})

export default sequelize;