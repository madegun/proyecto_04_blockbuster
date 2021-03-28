import { Router } from 'express';
import { orderController } from '../controllers/order.controller.js';

const orderRoutes = Router();

orderRoutes.get("/", orderController.listOrders);
orderRoutes.post("/", orderController.createOrder);

export default orderRoutes;