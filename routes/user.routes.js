import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

// Crear el enroutador
const userRoutes = Router();

// Todo esto lleva el /user delante
userRoutes.get("/", userController.list);

export default userRoutes;