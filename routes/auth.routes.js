import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import checkUser from '../middlewares/checkUser.js';

const authRoutes = Router();

authRoutes.post("/", authController.auth);

export default authRoutes;