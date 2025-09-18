import express from 'express';

import authRoutes from "./authRoutes.js"
import passwordRecovery from "./passwordRecovery.js"

const router = express.Router();

// Asignás subrutas por tipo
router.use('/session', authRoutes);
router.use('/password-recovery', passwordRecovery);

export default router;