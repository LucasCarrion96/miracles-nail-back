const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userModel');
const transporter = require('../config/mailer');



const sendRecoveryCode = async (req, res) => {
    const { mail } = req.body;

    if (!mail) {
        return res.status(400).json({ message: 'El correo es requerido' });
    }

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

        await user.update({
            recoveryCode: code,
            recoveryExpires: expires,
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: mail,
            subject: 'Código de recuperación de contraseña',
            text: `Tu código de recuperación es: ${code}. Este código expirará en 10 minutos.`,
        });

        return res.status(200).json({ message: 'Código enviado al correo' });
    } catch (error) {
        console.error('Error al enviar código de recuperación:', error);
        return res.status(500).json({ message: 'Error al enviar código', error: error.message });
    }
};

const verifyRecoveryCode = async (req, res) => {
    const { mail, code } = req.body;

    if (!mail || !code) {
        return res.status(400).json({ message: 'Correo y código son requeridos' });
    }

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user || user.recoveryCode !== code) {
            return res.status(400).json({ message: 'Código inválido' });
        }

        if (new Date() > user.recoveryExpires) {
            return res.status(400).json({ message: 'Código expirado' });
        }

        return res.status(200).json({ message: 'Código válido' });
    } catch (error) {
        console.error('Error al verificar el código:', error);
        return res.status(500).json({ message: 'Error en la verificación', error: error.message });
    }
};

const resetPassword = async (req, res) => {
    const { mail, password } = req.body;
    const user = await User.findOne({ where: { mail } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const hashed = await bcrypt.hash(password, 10);
    await user.update({
        userPass: hashed,
        recoveryCode: null,
        recoveryExpires: null,
    });

    res.json({ success: true });
};

const passwordRecoveryController = { sendRecoveryCode, verifyRecoveryCode, resetPassword };
module.exports = {
    passwordRecoveryController
};