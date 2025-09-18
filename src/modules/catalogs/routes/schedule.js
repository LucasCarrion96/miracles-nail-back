import express from 'express';
import scheduleControllers from '../controllers/scheduleControllers.js';

const router = express.Router();
// Ruta para obtener los horarios ocupado del dia seleccionado
router.get('/:year-:month-:day/unavailable-times', scheduleControllers.getUnavailableTimes);

// Ruta para obtener los días completos de un mes específico
router.get('/full-days/:year/:month', scheduleControllers.getFullDays);

export default router;
