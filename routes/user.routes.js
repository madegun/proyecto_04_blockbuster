import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkUser from '../middlewares/checkUser.js';
// import checkJWT from '../middlewares/jwt.js';

const userRoutes = Router();

userRoutes.get("/", checkAdmin, userController.listUsers);
userRoutes.get("/:id", checkAdmin, userController.findUser);
userRoutes.get("/profile/:email", checkUser, userController.viewUserProfile);
userRoutes.post("/createUserAdmin", checkAdmin, userController.createUserAdmin);
userRoutes.delete("/:id", checkAdmin, userController.deleteUser);
// userRoutes.post("/", userController.createUser);

export default userRoutes;