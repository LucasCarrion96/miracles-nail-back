const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
require('dotenv').config();
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
const usersRouter = require('./routes/users');
const servicesRouter = require('./routes/services');
const coursesRouter = require('./routes/courses');
const userCoursesRouter = require('./routes/userCourses');
const turnsRouter = require('./routes/turns');
const artTypeRouter = require('./routes/artType');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');
const sessionRouter = require('./routes/authRoutes'); // Rutas de autenticación
const priceRouter = require('./routes/price')
const scheduleRouter = require('./routes/schedule');
const healthCondition = require('./routes/healthConditions');
const passwordRecovery = require('./routes/passwordRecovery');


app.use('/users', usersRouter);
app.use('/services', servicesRouter);
app.use('/courses', coursesRouter);
app.use('/user_courses', userCoursesRouter);
app.use('/turns', turnsRouter);
app.use('/artTypes', artTypeRouter);
app.use('/session', sessionRouter);
app.use('/prices', priceRouter)
app.use('/schedules', scheduleRouter)
app.use('/mercadopago', mercadoPagoRoutes);
app.use('/health-conditions', healthCondition)
app.use('/password-recovery', passwordRecovery);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor Node.js en funcionamiento en http://localhost:${port}`);
});
