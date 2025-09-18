import express from 'express';
import authMiddleware from '../../../middleware/authMiddleware.js';
import isAdmin from '../../../middleware/adminAuthMiddleware.js';
import verifyToken from '../../../middleware/verifyTokenMiddleware.js';
import turnsControllers from '../controllers/turnsControllers.js';

const router = express.Router();

// Ruta para obtener todos los turnos
router.get('/', verifyToken, isAdmin, authMiddleware, turnsControllers.getAllTurns);
// Ruta para obtener los turnos del usuario logueado
router.get('/profile/turns', authMiddleware, (req, res) => {
    console.log('Ruta /profile/turns llamada');
    turnsControllers.getTurnsForUserProfile(req, res); // Llamar al controlador directamente
});

router.post('/create', (req, res) => turnsControllers.createTurn(req, res));
router.delete('/:idTurns', turnsControllers.deleteTurn);


export default router;
