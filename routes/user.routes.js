import { Router } from 'express';
import { userController } from '../controllers/user.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkPassword from '../middlewares/checkPassword.js';
import checkUser from '../middlewares/checkUser.js';
// import checkJWT from '../middlewares/jwt.js';

const userRoutes = Router();

userRoutes.post("/profile", checkUser, userController.viewUserProfile);
userRoutes.post("/createUserAdmin", [checkUser, checkAdmin], userController.createUserAdmin);
userRoutes.post("/createUser", [checkUser, checkAdmin], userController.createUser);
userRoutes.post("/", [checkUser, checkPassword, checkAdmin], userController.listUsers);
userRoutes.post("/:id", [checkUser, checkAdmin], userController.findUser);
userRoutes.delete("/:id", [checkUser, checkAdmin], userController.deleteUser);

export default userRoutes;