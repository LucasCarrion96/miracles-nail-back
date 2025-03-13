const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminAuthMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const { turnsControllers } = require('../controllers/turnsControllers');

// Ruta para obtener todos los turnos
router.get('/', verifyToken, isAdmin, authMiddleware, turnsControllers.getAllTurns);
// Ruta para obtener los turnos del usuario logueado
router.get('/profile/turns', authMiddleware, (req, res) => {
    console.log('Ruta /profile/turns llamada');
    turnsControllers.getTurnsForUserProfile(req, res); // Llamar al controlador directamente
});

router.post('/create', (req, res) => turnsControllers.createTurn(req, res));
router.delete('/:idTurns', turnsControllers.deleteTurn);


module.exports = router;
