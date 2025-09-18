import express from 'express';
import passwordRecoveryController from '../controllers/passwordRecoveryController.js';

const router = express.Router();
// Enviar código al mail
router.post('/recover', passwordRecoveryController.sendRecoveryCode);

// Verificar código
router.post('/verify', passwordRecoveryController.verifyRecoveryCode);

// Resetear contraseña 
router.post('/reset', passwordRecoveryController.resetPassword);

export default router;