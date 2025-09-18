import express from 'express';
import serviceControllers from '../controllers/servicesControllers.js';
import isAdmin from '../../../middleware/adminAuthMiddleware.js';


const router = express.Router();

// Diseños
router.get('/', isAdmin, serviceControllers.getAllService);
router.put('/:idService', isAdmin, serviceControllers.updateService);

export default router;