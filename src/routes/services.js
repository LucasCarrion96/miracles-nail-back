const express = require('express');
const { serviceControllers } = require('../controllers/servicesControllers');
const isAdmin = require('../middleware/adminAuthMiddleware');

const router = express.Router();

// Diseños
router.get('/', isAdmin, serviceControllers.getAllService);
router.put('/:idService', isAdmin, serviceControllers.updateService);

module.exports = router;