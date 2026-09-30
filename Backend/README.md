# Grocerin Server - Express.js API

The backend microservice for the Grocerin Quick-Commerce Grocery Platform, built with Node.js, Express.js, MongoDB Atlas, Redis caching, and Stripe payment processing.

---

## Highlights

- **Multi-Tier Cache Layer**: `ioredis` client with non-blocking initialization and automatic in-memory TTL dictionary fallback.
- **Triple-Layer DDoS Protection**: Dedicated rate limiters for general API routes, authentication endpoints, and order checkout spam.
- **Dark Store APIs**: Real-time order fulfillment pipeline updater, analytics metrics, and SKU management with Cloudinary image uploads.
- **DevOps Observability**: Health probe at `/health` detailing memory usage, cache mode, and system uptime.
- **Dockerized**: Lightweight Node.js Alpine container with production security standards.

---

## Directory Layout

```
Backend/
├── configs/          # MongoDB, Cloudinary, and Redis cache configurations
├── controllers/      # Route handler controllers (Auth, Products, Cart, Orders, Addresses)
├── middlewares/      # JWT auth, seller auth, Multer file upload, and rate limiters
├── models/           # Mongoose data models
├── routes/           # Express router endpoints
├── Dockerfile        # Production Docker configuration
├── package.json      # Dependencies and scripts
└── server.js         # Server bootstrap, error handlers, and middleware stack
```

---

## Scripts

```bash
# Install dependencies
npm install

# Start server in development mode
npm run server

# Start server in production mode
npm start
```

---

## Environment Configuration

Create a `.env` file in the `Backend/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
CURRENCY=₹

# Optional Redis Cache (defaults to in-memory fallback if omitted)
REDIS_URL=redis://localhost:6379

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# Seller Master Account
SELLER_EMAIL=admin@grocerin.com
SELLER_PASSWORD=AdminSecurePassword123!
```
