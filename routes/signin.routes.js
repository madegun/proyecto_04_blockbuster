import { Router } from 'express';
import { signinController } from '../controllers/signin.controller.js';

const signinRoutes = Router();

signinRoutes.post("/", signinController.createUser);

export default signinRoutes;