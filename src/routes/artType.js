// rutas/artTypeRoutes.js
const express = require('express');
const { artTypeControllers } = require('../controllers/artTypeControllers');
const isAdmin = require('../middleware/adminAuthMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const router = express.Router();

// Diseños
router.get('/', verifyToken, isAdmin, artTypeControllers.getAllArtType);
router.put('/:idArtType', isAdmin, artTypeControllers.updateArtType);

module.exports = router;