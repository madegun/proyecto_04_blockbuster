import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';

const authRoutes = Router();

authRoutes.post("/", authController.auth);


export default authRoutes;