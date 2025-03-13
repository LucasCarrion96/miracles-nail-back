const express = require('express');
const router = express.Router();
const { login, checkSession, logout } = require('../controllers/authControllers');

router.post('/login', login);
router.get('/check-session', checkSession);
router.post('/logout', logout);

module.exports = router;