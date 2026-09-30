import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhook } from './controllers/orderController.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { getRedisStatus } from './configs/redis.js';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// Stripe Webhook MUST be defined BEFORE express.json() to preserve raw body buffer
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

// Production Security & Performance Middlewares
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// Allow multiple origins 
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'https://grocerinx.vercel.app'
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Permissive for quick-commerce demo / staging
        }
    },
    credentials: true
}));

// Apply general API rate limiting to all /api routes
app.use('/api', apiLimiter);

// System Health Check Endpoint (Senior DevOps & Production Grade)
app.get('/health', (req, res) => {
    const memory = process.memoryUsage();
    res.json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())}s`,
        database: {
            status: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
            host: mongoose.connection.host || 'unknown'
        },
        cache: getRedisStatus(),
        memory: {
            heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)} MB`,
            rss: `${Math.round(memory.rss / 1024 / 1024)} MB`
        }
    });
});

app.get('/', (req, res) => res.send("Grocerin Quick-Commerce Production API is running"));

// API Route Mounts
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

// Centralized 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Unhandled API Error:", err.stack);
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

app.listen(port, () => {
    console.log(`[Grocerin] Production Server running on http://localhost:${port}`);
});