import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const orderRoutes = Router();

orderRoutes.post("/orders", orderController.listUserOrders);
orderRoutes.post("/order", orderController.createOrder);
orderRoutes.post("/", checkAdmin, orderController.listOrders);

export default orderRoutes;