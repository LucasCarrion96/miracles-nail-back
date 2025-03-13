const { Sequelize } = require('sequelize');
require('dotenv').config();  // Carga las variables del archivo .env

// Configura Sequelize con las variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
        logging: console.log, // Activa los logs de Sequelize
        pool: {
            max: parseInt(process.env.DB_CONNECTION_LIMIT, 10),
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

// Prueba la conexión
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida con éxito.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;
