const express = require('express');
const { userControllers } = require('../controllers/usersControllers');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminAuthMiddleware')
const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/profile', verifyToken, authMiddleware, userControllers.getUserProfile);

// Ruta para obtener usuarios con paginación
router.get('/', isAdmin, verifyToken, authMiddleware, userControllers.getUsersWithPagination);
//check email
router.get("/check-email", userControllers.checkEmailExists);
//Registrar usuario
router.post("/register", userControllers.createUser);


module.exports = router;
