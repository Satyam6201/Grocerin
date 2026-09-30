import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import { 
    getAllOrders, 
    getOrderStats, 
    getUserOrders, 
    placeOrderCOD, 
    placeOrderStripe, 
    updateOrderStatus 
} from "../controllers/orderController.js";
import { orderLimiter } from "../middlewares/rateLimiter.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, orderLimiter, placeOrderCOD);
orderRouter.post('/stripe', authUser, orderLimiter, placeOrderStripe);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/status', authSeller, updateOrderStatus);
orderRouter.get('/stats', authSeller, getOrderStats);

export default orderRouter;
