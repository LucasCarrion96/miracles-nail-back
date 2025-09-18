import express from 'express';
import authControllers from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login', authControllers.login);
router.get('/check-session', authControllers.checkSession);
router.post('/logout', authControllers.logout);
//check email
router.get("/check-email", authControllers.checkEmailExists);
//Registrar usuario
router.post("/register", authControllers.createUser);

export default router;