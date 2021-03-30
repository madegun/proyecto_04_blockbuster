import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkUser from '../middlewares/checkUser.js';
// import checkJWT from '../middlewares/jwt.js';

const userRoutes = Router();

userRoutes.post("/", [checkUser, checkAdmin], userController.listUsers);
// userRoutes.get("/", checkAdmin, userController.listUsers);
userRoutes.post("/:id", [checkUser, checkAdmin], userController.findUser);
userRoutes.post("/profile/:email", checkUser, userController.viewUserProfile);
userRoutes.post("/createUserAdmin", [checkUser, checkAdmin], userController.createUserAdmin);
userRoutes.delete("/:id", [checkUser, checkAdmin], userController.deleteUser);
// userRoutes.post("/", userController.createUser);

export default userRoutes;