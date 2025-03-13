const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminAuthMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const { scheduleControllers } = require('../controllers/scheduleControllers');


// Ruta para obtener los horarios ocupado del dia seleccionado
router.get('/:year-:month-:day/unavailable-times', scheduleControllers.getUnavailableTimes);

// Ruta para obtener los días completos de un mes específico
router.get('/full-days/:year/:month', scheduleControllers.getFullDays);

module.exports = router;
