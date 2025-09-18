import express from 'express';
import priceControllers from '../controllers/priceControllers.js';

const router = express.Router();

router.get('/', priceControllers.getAllPrices);

export default router;
