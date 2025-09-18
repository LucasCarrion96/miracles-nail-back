import express from 'express';
import coursesControllers from "../controllers/coursesControllers.js"

import isAdmin from '../../../middleware/adminAuthMiddleware.js';


const router = express.Router();

// Diseños
router.get('/', isAdmin, coursesControllers.getAllCourses);
router.put('/:idCourse', isAdmin, coursesControllers.updateCourse);

export default router;
