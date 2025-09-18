import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables desde .env

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODULES_PATH = path.join(__dirname, '../models');

// 1. Configuración de Sequelize con variables de entorno
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false,
        pool: {
            max: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// 2. Scanner recursivo de modelos
async function loadModels(sequelize) {
    const modelFiles = await findModelFiles(MODULES_PATH);

    for (const file of modelFiles) {
        const modelModule = await import(file);
        const model = modelModule.default(sequelize, Sequelize.DataTypes);
        if (model) {
            sequelize.models[model.name] = model;
        }
    }
}

// 3. Buscar modelos ignorando index.js
async function findModelFiles(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let jsFiles = [];

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            jsFiles = [...jsFiles, ...(await findModelFiles(fullPath))];
        } else if (
            entry.isFile() &&
            entry.name.endsWith('.js') &&
            entry.name !== 'index.js'
        ) {
            jsFiles.push(fullPath);
        }
    }
    return jsFiles;
}

// 4. Carga modelos y asocia
async function initializeDatabase() {
    try {
        await loadModels(sequelize);

        Object.values(sequelize.models).forEach(model => {
            if (model.associate) {
                model.associate(sequelize.models);
            }
        });

        await sequelize.authenticate();
        console.log('✅ Base de datos conectada y modelos cargados.');
    } catch (error) {
        console.error('❌ Error al inicializar la DB:', error);
        process.exit(1);
    }
}

await initializeDatabase();

export { sequelize, Sequelize };