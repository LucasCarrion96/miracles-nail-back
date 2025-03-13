const express = require('express');
const router = express.Router();
const { createPayment, paymentWebhook } = require('../controllers/mercadoPagoControllers');

router.get('/create-payment', createPayment);
router.get('/sucess')
router.post('/webhook', paymentWebhook);

module.exports = router;
