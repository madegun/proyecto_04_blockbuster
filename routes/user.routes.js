import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';

const userRoutes = Router();

userRoutes.get("/", userController.listUsers);
userRoutes.get("/:id", userController.findUser);
userRoutes.post("/", userController.createUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;