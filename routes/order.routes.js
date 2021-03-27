import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';

const orderRoutes = Router();

orderRoutes.get("/", orderController.listOrders);
orderRoutes.get("/createOrder", orderController.createOrder);

export default orderRoutes;