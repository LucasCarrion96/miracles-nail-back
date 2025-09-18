import express from 'express';
import userControllers from '../controllers/usersControllers.js';
import authMiddleware from '../../../middleware/authMiddleware.js';
import isAdmin from '../../../middleware/adminAuthMiddleware.js';
import verifyToken from '../../../middleware/verifyTokenMiddleware.js';
const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/profile', verifyToken, authMiddleware, userControllers.getUserProfile);

// Ruta para obtener usuarios con paginación
router.get('/', isAdmin, verifyToken, authMiddleware, userControllers.getUsersWithPagination);



export default router;
