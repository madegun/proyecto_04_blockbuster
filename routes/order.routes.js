import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkUser from '../middlewares/checkUser.js';

const orderRoutes = Router();

orderRoutes.post("/myOrders", checkUser, orderController.listUserOrders);
orderRoutes.post("/createOrder", checkUser, orderController.createOrder);
orderRoutes.post("/listOrders", [checkUser, checkAdmin], orderController.listOrders);

export default orderRoutes;