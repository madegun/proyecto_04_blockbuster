import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const orderRoutes = Router();

orderRoutes.post("/myOrders", orderController.listUserOrders);
orderRoutes.post("/createOrder", orderController.createOrder);
orderRoutes.post("/listOrders", checkAdmin, orderController.listOrders);

export default orderRoutes;