import express from 'express';
import mercadoPagoController from '../controllers/mercadoPagoControllers.js';

const router = express.Router();

router.get('/create-payment', mercadoPagoController.createPayment);
router.get('/success')
router.post('/webhook', mercadoPagoController.paymentWebhook);

export default router;
