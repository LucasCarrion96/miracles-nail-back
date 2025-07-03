const nodemailer = require('nodemailer');
require('dotenv').config(); // Asegurate de tener esto para cargar el .env

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

module.exports = transporter;