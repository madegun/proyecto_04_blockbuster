import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkUser from '../middlewares/checkUser.js';

const orderRoutes = Router();

orderRoutes.get("/", [checkUser, checkAdmin], orderController.listOrders);
orderRoutes.post("/", checkUser, orderController.createOrder);
orderRoutes.post("/myorders", checkUser, orderController.listUserOrders);

export default orderRoutes;