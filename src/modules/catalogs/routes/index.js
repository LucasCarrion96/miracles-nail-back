import express from 'express';

import artType from "./artType";
import healthConditions from "./healthConditions";
import price from "./price";
import schedule from "./schedule";


const router = express.Router()

///rutas
router.use('/artTypes', artType)
router.use('/healthConditions', healthConditions)
router.use('/price', price)
router.use('/schedules', schedule)

export default router;



