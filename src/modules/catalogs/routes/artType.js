// rutas/artTypeRoutes.js
import express from 'express';
import artTypeControllers from '../controllers/artTypeControllers.js';
import isAdmin from '../../../middleware/adminAuthMiddleware.js';
import verifyToken from '../../../middleware/verifyTokenMiddleware.js';

const router = express.Router();

// Diseños
router.get('/', verifyToken, isAdmin, artTypeControllers.getAllArtType);
router.put('/:idArtType', isAdmin, artTypeControllers.updateArtType);

export default router;