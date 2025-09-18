import express from 'express';

import users from "./users";
import userCourses from "./userCourses";

const router = express.Router()

///rutas
router.use('/get-users', users)
router.use('/userCourses', userCourses)

export default router;

