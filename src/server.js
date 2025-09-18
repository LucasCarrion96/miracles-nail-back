

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mysql from 'mysql2';
import dotenv from 'dotenv';
// Cargar variables de entorno
dotenv.config();
//tasklist | findstr node    <==  Sirve para ver los procesos que hay de node puede generear conflict si se quedan varios abiertos
const app = express();
const port = 3001;

// Middleware
app.use(cookieParser());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Configuración CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permitir cookies en solicitudes de cliente
}));

app.use(morgan('dev'));

// Configuración de la base de datos MySQL
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const connection = mysql.createPool(dbOptions);

// Rutas
import catalogsRoutes from '@catalogsRoutes';
import userRoutes from '@userRoutes';
import servicesRoutes from '@servicesRoutes';
import authRoutes from '@authRoutes';
import mercadoPagoRoutes from "./modules/mercado-pago/routes/mercadoPagoRoutes.js";
//-------------------------------//

app.use('/catalog', catalogsRoutes);
app.use('/users', userRoutes);
app.use('/services', servicesRoutes);
app.use('/auth', authRoutes);
app.use('/mercadopago', mercadoPagoRoutes);
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js en funcionamiento en http://localhost:${port}`);
});
