import express from 'express';

import courses from "./courses";
import services from "./services";
import turns from "./turns";



const router = express.Router()

///rutas
router.use('/courses', courses)
router.use('/get-services', services)
router.use('/turns', turns)


export default router;


