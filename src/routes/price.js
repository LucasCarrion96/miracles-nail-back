const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminAuthMiddleware');
const verifyToken = require('../middleware/verifyTokenMiddleware');
const { priceControllers } = require('../controllers/priceControllers');

router.get('/', priceControllers.getAllPrices);

module.exports = router;
