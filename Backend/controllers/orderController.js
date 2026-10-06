import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        let calculatedSubtotal = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
            }
            calculatedSubtotal += product.offerPrice * item.quantity;
        }

        const taxCharge = Math.floor(calculatedSubtotal * 0.02);
        const finalAmount = calculatedSubtotal + taxCharge;

        const newOrder = await Order.create({
            userId,
            items,
            amount: finalAmount,
            address,
            paymentType: "COD",
            status: "Order Placed",
            isPaid: false
        });

        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return res.json({ 
            success: true, 
            message: "Order Placed Successfully",
            orderId: newOrder._id
        });

    } catch (error) {
        console.error("Place Order COD Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const placeOrderStripe = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;
        const origin = req.headers.origin || 'http://localhost:5173';

        if (!address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order data" });
        }

        let productData = [];
        let calculatedSubtotal = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
            }
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            calculatedSubtotal += product.offerPrice * item.quantity;
        }

        const taxCharge = Math.floor(calculatedSubtotal * 0.02);
        const finalAmount = calculatedSubtotal + taxCharge;

        const order = await Order.create({
            userId,
            items,
            amount: finalAmount,
            address,
            paymentType: "Online",
            status: "Pending Payment",
            isPaid: false
        });

        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round((item.price + item.price * 0.02) * 100)
                },
                quantity: item.quantity,
            };
        });

        const session = await stripeInstance.checkout.sessions.create({
            line_items, 
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            locale: "auto",
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        });

        return res.json({ success: true, url: session.url });

    } catch (error) {
        console.error("Place Order Stripe Error:", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const stripeWebhook = async (request, response) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error(`Webhook Error: ${error.message}`);
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntent.id,
            });

            if (sessions.data.length > 0) {
                const { orderId, userId } = sessions.data[0].metadata;
                await Order.findByIdAndUpdate(orderId, {
                    isPaid: true,
                    status: "Order Placed",
                    updatedAt: Date.now()
                });
                await User.findByIdAndUpdate(userId, { cartItems: {} });
            }
            break;
        }

        case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;
            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntent.id,
            });
            if (sessions.data.length > 0) {
                const { orderId } = sessions.data[0].metadata;
                await Order.findByIdAndUpdate(orderId, {
                    status: "Payment Failed"
                });
            }
            break;
        }
    
        default:
            break;
    }
    response.json({ received: true });
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, orders });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 })
            .lean();

        res.json({ success: true, orders });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status required" });
        }

        const validStatuses = ["Order Placed", "Confirmed", "Packing", "Out for Delivery", "Delivered", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId, 
            { status, updatedAt: Date.now() }, 
            { new: true }
        );

        res.json({ success: true, message: `Status updated to ${status}`, order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const deliveredOrders = await Order.countDocuments({ status: "Delivered" });
        const pendingOrders = await Order.countDocuments({ 
            status: { $in: ["Order Placed", "Confirmed", "Packing", "Out for Delivery"] } 
        });

        const allOrders = await Order.find({ isPaid: true }).select('amount');
        const totalRevenue = allOrders.reduce((acc, order) => acc + (order.amount || 0), 0);

        res.json({
            success: true,
            stats: {
                totalOrders,
                deliveredOrders,
                pendingOrders,
                totalRevenue
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const validateCoupon = async (req, res) => {
    try {
        const { code, cartTotal } = req.body;
        if (!code) {
            return res.status(400).json({ success: false, message: "Coupon code is required" });
        }
        const cleanCode = code.toUpperCase().trim();
        const total = Number(cartTotal) || 0;

        let discount = 0;
        let freeDelivery = false;
        let message = "";

        if (cleanCode === 'GROCER100') {
            if (total < 499) {
                return res.json({ success: false, message: "GROCER100 requires minimum order of ₹499" });
            }
            discount = 100;
            message = "Flat ₹100 Discount Applied!";
        } else if (cleanCode === 'GROCER250') {
            if (total < 1499) {
                return res.json({ success: false, message: "GROCER250 requires minimum order of ₹1499" });
            }
            discount = 250;
            message = "Super Saver ₹250 Discount Applied!";
        } else if (cleanCode === 'FREEDEL') {
            freeDelivery = true;
            message = "100% Free 10-Minute Delivery Unlocked!";
        } else if (cleanCode === 'FIRSTBITE') {
            discount = Math.min(Math.round(total * 0.20), 200);
            message = `20% Welcome Savings (₹${discount}) Applied!`;
        } else if (cleanCode === 'NIGHTOWL') {
            discount = Math.min(Math.round(total * 0.15), 150);
            message = `15% Night Express Discount (₹${discount}) Applied!`;
        } else if (cleanCode === 'SUPERDEV') {
            discount = Math.min(Math.round(total * 0.30), 300);
            message = `30% SDE Candidate Special Discount (₹${discount}) Applied!`;
        } else {
            return res.json({ success: false, message: "Invalid coupon. Try GROCER100, GROCER250 or SUPERDEV" });
        }

        return res.json({
            success: true,
            code: cleanCode,
            discount,
            freeDelivery,
            message
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId;
        if (!orderId) {
            return res.status(400).json({ success: false, message: "Order ID is required" });
        }

        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (!["Order Placed", "Confirmed"].includes(order.status)) {
            return res.status(400).json({ 
                success: false, 
                message: `Order is in "${order.status}" status and can no longer be cancelled.` 
            });
        }

        order.status = "Cancelled";
        order.updatedAt = Date.now();
        await order.save();

        return res.json({
            success: true,
            message: "Order cancelled successfully.",
            order
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getOrderTelemetry = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId).populate('items.product').populate('address');
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const createdAt = new Date(order.createdAt).getTime();
        const elapsedSeconds = Math.max(0, Math.floor((Date.now() - createdAt) / 1000));
        const totalDuration = 600; // 10 minutes SLA
        const remainingSeconds = Math.max(0, totalDuration - elapsedSeconds);
        const progressPercent = Math.min(100, Math.round((elapsedSeconds / totalDuration) * 100));

        return res.json({
            success: true,
            order,
            telemetry: {
                hubId: "PATNA-HUB-102",
                hubName: "Boring Road Cold-Chain Dark Store #102",
                riderName: "Vikram Rathore",
                riderPhone: "+91 98351 22890",
                vehicleType: "Electric Scooter (Zero Emission)",
                coldChainTemp: "3.6°C (Optimal Freshness)",
                speedKmh: order.status === "Delivered" ? 0 : 28,
                distanceKm: order.status === "Delivered" ? "0.0 km" : (Math.max(0.1, 1.8 * (1 - progressPercent / 100)).toFixed(1) + " km"),
                etaMinutes: Math.ceil(remainingSeconds / 60),
                remainingSeconds,
                progressPercent,
                batteryLevel: "88%"
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

