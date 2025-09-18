import express from 'express';
import { getUserCourses } from '../controllers/userCourseControllers.js';

const router = express.Router();

router.get('/', getUserCourses);

export default router;