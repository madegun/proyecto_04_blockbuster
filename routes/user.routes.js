import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const userRoutes = Router();

userRoutes.post("/profile", userController.viewUserProfile);
userRoutes.post("/useradmin", checkAdmin, userController.createUserAdmin);
userRoutes.post("/use", checkAdmin, userController.createUser);
userRoutes.post("/", checkAdmin, userController.listUsers);
userRoutes.post("/:id", checkAdmin, userController.findUser);
userRoutes.delete("/:id", checkAdmin, userController.deleteUser);

export default userRoutes;