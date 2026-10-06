import express from "express";
import authUser from "../middlewares/authUser.js";
import authSeller from "../middlewares/authSeller.js";
import { 
    getAllOrders, 
    getOrderStats, 
    getUserOrders, 
    placeOrderCOD, 
    placeOrderStripe, 
    updateOrderStatus,
    validateCoupon,
    cancelOrder,
    getOrderTelemetry,
    getBikerOrders,
    updateBikerOrderStatus,
    verifyBikerDeliveryOtp,
    getFleetBikers,
    assignBikerToOrder,
    trackOrderById
} from "../controllers/orderController.js";
import { orderLimiter } from "../middlewares/rateLimiter.js";

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, orderLimiter, placeOrderCOD);
orderRouter.post('/stripe', authUser, orderLimiter, placeOrderStripe);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/status', authSeller, updateOrderStatus);
orderRouter.get('/stats', authSeller, getOrderStats);
orderRouter.post('/coupon', validateCoupon);
orderRouter.post('/cancel', authUser, cancelOrder);
orderRouter.get('/telemetry/:orderId', authUser, getOrderTelemetry);
orderRouter.get('/biker/active', getBikerOrders);
orderRouter.post('/biker/status', updateBikerOrderStatus);
orderRouter.post('/biker/verify-otp', verifyBikerDeliveryOtp);
orderRouter.get('/fleet', getFleetBikers);
orderRouter.post('/assign-biker', authSeller, assignBikerToOrder);
orderRouter.get('/track/:orderId', trackOrderById);

export default orderRouter;
