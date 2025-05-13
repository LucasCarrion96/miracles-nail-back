const express = require('express');
const router = express.Router();
const { passwordRecoveryController } = require('../controllers/passwordRecoveryController');

// Enviar código al mail
router.post('/recover', passwordRecoveryController.sendRecoveryCode);

// Verificar código
router.post('/recover/verify', passwordRecoveryController.verifyRecoveryCode);

// Resetear contraseña
router.post('/recover/reset', passwordRecoveryController.resetPassword);

module.exports = router;