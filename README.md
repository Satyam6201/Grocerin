# Grocerin - Hyperlocal 10-Minute Quick-Commerce Grocery Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-grocerinx.vercel.app-00DC82?style=for-the-badge&logo=vercel&logoColor=white)](https://grocerinx.vercel.app/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github-actions)](https://github.com/Satyam6201/Grocerin)
[![Docker Support](https://img.shields.io/badge/Docker-Multi--Stage-blue?style=for-the-badge&logo=docker)](https://github.com/Satyam6201/Grocerin)
[![Redis](https://img.shields.io/badge/Redis-Sub--15ms%20Cache%20%26%20TTL-DC382D?style=for-the-badge&logo=redis)](https://github.com/Satyam6201/Grocerin)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%20RAG-8E75C4?style=for-the-badge&logo=google)](https://github.com/Satyam6201/Grocerin)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%20%7C%20TailwindCSS%204-61DAFB?style=for-the-badge&logo=react)](https://github.com/Satyam6201/Grocerin)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js)](https://github.com/Satyam6201/Grocerin)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas%20(100%20Pool)-47A248?style=for-the-badge&logo=mongodb)](https://github.com/Satyam6201/Grocerin)
[![Payments](https://img.shields.io/badge/Payments-Stripe%20API%20%26%20COD-635BFF?style=for-the-badge&logo=stripe)](https://github.com/Satyam6201/Grocerin)

> **Live Application URL**: [https://grocerinx.vercel.app/](https://grocerinx.vercel.app/)

**Grocerin** is a production-grade, ultra-fast 10-minute grocery delivery platform engineered to deliver farm-fresh vegetables, fruits, dairy, instant foods, and daily essentials with micro-warehouse fulfillment speeds. Built with high concurrency handling, multi-tier Redis caching, connection-pooled database clustering, Google Gemini RAG grounding, real-time rider telemetry, and responsive mobile-first interfaces.

---

## Table of Contents
1. [Live Production Deployment](#-live-production-deployment)
2. [Key Highlights & Core Modules](#-key-highlights--core-modules)
3. [Engineering Architecture](#-engineering-architecture)
4. [Technology Stack](#-technology-stack)
5. [Repository Structure](#-repository-structure)
6. [Complete REST API Reference](#-complete-rest-api-reference)
7. [Getting Started & Local Setup](#-getting-started--local-setup)
8. [Docker Multi-Stage Deployment](#-docker-multi-stage-deployment)
9. [License](#-license)

---

## Live Production Deployment

Access the live cloud deployment directly:

- **Customer Web Store**: [https://grocerinx.vercel.app/](https://grocerinx.vercel.app/)
- **10-Minute Offers & Flash Deals**: [https://grocerinx.vercel.app/offer](https://grocerinx.vercel.app/offer)
- **Live Delivery Radar & Tracking**: [https://grocerinx.vercel.app/tractOrder](https://grocerinx.vercel.app/tractOrder)
- **Delivery Biker App Mode**: [https://grocerinx.vercel.app/biker](https://grocerinx.vercel.app/biker)
- **Dark Store Seller Command Center**: [https://grocerinx.vercel.app/seller](https://grocerinx.vercel.app/seller)
- **Help Center & FAQs**: [https://grocerinx.vercel.app/faq](https://grocerinx.vercel.app/faq)
- **Delivery SLA Information**: [https://grocerinx.vercel.app/DeliveryInfo](https://grocerinx.vercel.app/DeliveryInfo)
- **Return & Refund Policy**: [https://grocerinx.vercel.app/returnRefund](https://grocerinx.vercel.app/returnRefund)

---

## Key Highlights & Core Modules

### 1. 10-Minute Micro-Warehouse Fulfillment SLA
- **Hyperlocal Dark Store Hub Network**: Micro-fulfillment centers positioned within 3 km of customer neighborhoods (e.g. Boring Road Hub #102, Bailey Road Hub #108).
- **Sub-2-Minute Order Picking**: Streamlined SKU racking allows pickers to bag groceries in under 120 seconds.
- **Strict Cold Chain Preservation**: Dedicated multi-temperature packing (Frozen at -18°C, Dairy at 3-4°C, Fresh Produce at 22°C).

### 2. Live Rider GPS Telemetry & Simulation Engine
- **Real-Time Synchronized Movement**: Delivery bike moves dynamically across the transit route aligned with the countdown timer.
- **Deceleration Physics**: Simulates real-world traffic deceleration (32 km/h cruise -> 16 km/h street -> 6 km/h gate -> 0 km/h doorstep arrival).
- **Automated Delivery Hand-off**: Automatic transition to "Delivered" state upon reaching 00:00 with OTP verification.
- **Simulation Controls**: Instant Fast-Forward and Replay dispatch triggers for real-time testing.

### 3. Grocerin AI Shopping Assistant
- **Google Gemini Generative AI**: Powered by `gemini-1.5-flash` with multi-model fallback (`gemini-2.0-flash`, `gemini-1.5-flash-8b`, `gemini-1.5-pro`).
- **Dynamic Catalog Grounding**: Reads real-time in-stock inventory and prices for instant recommendation of recipes, ingredient kits, and budget combos.
- **100% Uptime Rule Engine**: High-speed offline grocery heuristic engine ensures zero downtime even during upstream provider limits.

### 4. Biker Mode App & Fleet Dispatch Management
- **Delivery Partner App (`/biker`)**: Shift toggle (On Duty / Break), Google Maps turn-by-turn navigation, customer direct calling, and 4-digit OTP handover confirmation.
- **Admin Fleet Dispatch (`/seller/bikers`)**: Live roster telemetry, EV battery indicators, active trip counts, and 1-click order assignment.

### 5. Seamless Navigation & Responsive Design
- **Global Instant Scroll-to-Top**: Seamless page transitions with forced viewport reset to (0, 0) across all route changes.
- **100% Mobile Optimized**: Touch-friendly buttons, bottom navigation drawers, floating cart bars, and mobile-first touch targets.
- **Dual-Engine Location Detection**: 1-Click GPS reverse geocoding pinpoints locality and 6-digit postal PIN code.

### 6. Interactive Flash Deals & Scratch Card Engine
- **Active Promo Codes**: 1-Click clipboard copy for `GROCER100`, `GROCER250`, `FRESH50`, and `QUICKFREE`.
- **HTML5 Canvas Scratch Card**: Gamified scratch-to-reveal discount vouchers with particle confetti animations.
- **Smart Recipe Bundles**: 1-Click addition of complete meal kits (Paneer Butter Masala, Healthy Breakfast, Veg Biryani).

---

## Engineering Architecture

```
+----------------------------------------------------------------------------------------------------+
|                                         CLIENT LAYER                                               |
|  React 19 + Vite 7 + Tailwind CSS 4 + React Router v7 + Context API + React Hot Toast              |
|  - Delivery Biker Terminal (/biker, /rider): Shift toggle, Google Maps GPS & OTP verify            |
|  - Admin Fleet Dispatcher (/seller/bikers): Real-time roster telemetry & 1-click trip dispatch     |
|  - Customer Live Tracking (/tractOrder): Live ETA, Biker telemetry, OTP code & doorstep arrival   |
|  - Dark Store Seller Portal (/seller): Margin calculator, stock toggles & order queue              |
|  - Grocerin AI Chatbot: Catalog RAG grounding & 100% uptime fallback intelligence                 |
|  - Gamified Canvas Scratch & Win Promo Cards with particle confetti engine                         |
|  - 1-Click Smart Meal Kits & Recipe Bundles (Instant Batch Cart Addition)                          |
|  - GPS Geolocation Engine (Auto-detects Locality & 6-digit PIN code)                               |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  | HTTPS / REST JSON
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                      EDGE & REVERSE PROXY                                          |
|  NGINX Reverse Proxy (Gzip, HTTP/2, Cache-Control: public, max-age=30, Security Headers)           |
+----------------------------------------------------------------------------------------------------+
                                                  |
                                                  v
+----------------------------------------------------------------------------------------------------+
|                                          BACKEND API                                               |
|  Node.js + Express.js + Compression (Level 6) + Helmet + ETags                                     |
|  - Global API Limiter (500 req / 15m)                                                              |
|  - Sensitive Auth Limiter (15 req / 15m)                                                           |
|  - Order Checkout Limiter (20 req / 30m)                                                           |
|  - Biker Fleet Dispatch & OTP Verification Engine (/api/order/biker/*)                             |
|  - Dynamic Coupon Engine (GROCER100, GROCER250, FRESH50, QUICKFREE)                                 |
|  - Order Cancellation & Automated Refund Pipeline                                                  |
|  - ChatBot LLM Grounding & Heuristic Extractor Pipeline                                            |
+----------------------------------------------------------------------------------------------------+
         |                                |                                   |
         v                                v                                   v
+------------------+             +------------------+                +------------------+
|   CACHE LAYER    |             |   PERSISTENCE    |                |    AI ENGINE     |
|  Redis (ioredis) |             |  MongoDB Atlas   |                |  Google Gemini   |
|  - Catalog Cache |             |  - 100 Conn Pool |                |  - Flash 1.5/2.0 |
|  - Fallback Dict |             |  - Index Shards  |                |  - Grounded RAG  |
|  - TTL Invalidate|             |  - ACID Webhooks |                |  - Zero-Emoji    |
+------------------+             +------------------+                +------------------+
```

---

## Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), React Router v7 |
| **Icons & UI Utilities** | React Icons (`react-icons/hi2`, `react-icons/fa6`), Lucide React, Canvas Confetti, React Hot Toast |
| **Backend API** | Node.js (v20+), Express.js, ioredis, Mongoose, Multer, Cloudinary SDK |
| **Security & Middleware** | Helmet, Compression, Express Rate Limit, JWT Authentication, CORS |
| **Databases & Caching** | MongoDB Atlas (Pooled 100-connection cluster), Redis (Sub-15ms cache with in-memory TTL dictionary fallback) |
| **Generative AI** | Google Gemini API (`gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro`) |
| **Payment Gateways** | Stripe API (Credit/Debit/RuPay/Cards) & Cash on Delivery (COD) |
| **DevOps & Containers** | Docker (Multi-stage Alpine), Docker Compose, NGINX Reverse Proxy, Vercel |

---

## Repository Structure

```
Grocerin/
├── Backend/                            # Node.js + Express Scalable API Server
│   ├── configs/
│   │   ├── cloudinary.js               # Cloudinary CDN media configuration
│   │   ├── db.js                       # MongoDB Atlas connection pooling (maxPool: 100)
│   │   └── redis.js                    # Redis client with resilient in-memory TTL fallback
│   ├── controllers/
│   │   ├── addressController.js        # Saved addresses CRUD
│   │   ├── cartController.js           # Stateful user cart synchronization
│   │   ├── chatController.js           # Gemini AI shopping assistant with catalog grounding
│   │   ├── orderController.js          # Stripe, COD, biker fleet dispatch, OTP verification & telemetry
│   │   ├── productController.js        # Catalog endpoints, reviews & Redis cache invalidation
│   │   ├── sellerController.js         # Dark store admin authentication
│   │   └── userController.js           # Customer registration, JWT login, OTP reset & profile
│   ├── middlewares/
│   │   ├── auth.js                     # Customer JWT verification middleware
│   │   ├── authSeller.js               # Dark store manager JWT verification
│   │   ├── multer.js                   # Multi-part form-data image buffer parser
│   │   └── rateLimiter.js              # Triple-layer rate-limiting rules
│   ├── models/
│   │   ├── Address.js                  # Delivery address Mongoose schema
│   │   ├── Biker.js                    # Delivery fleet biker Mongoose schema
│   │   ├── Order.js                    # Order schema with biker assignment & delivery OTP
│   │   ├── Product.js                  # Product catalog schema with rating & verified reviews
│   │   └── User.js                     # User schema with salted password hashes & OTP
│   ├── routes/
│   │   ├── addressRoute.js             # /api/address endpoints
│   │   ├── cartRoute.js                # /api/cart endpoints
│   │   ├── chatRoute.js                # /api/chat Gemini assistant endpoint
│   │   ├── orderRoute.js               # /api/order endpoints (biker, fleet, tracking, checkout)
│   │   ├── productRoute.js             # /api/product endpoints
│   │   ├── sellerRoute.js              # /api/seller endpoints
│   │   └── userRoute.js                # /api/user endpoints
│   ├── Dockerfile                      # Node.js Alpine production container
│   ├── package.json
│   └── server.js                       # Express server entry point & health check
│
├── Frontend/                           # React 19 + Vite 7 Client Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── TrackOrder.jsx          # Live customer delivery radar & OTP verification
│   │   │   ├── LiveTelemetryModal.jsx  # 10-Min Dark Store Rider Telemetry & SLA tracking
│   │   │   ├── ChatBot.jsx             # Grocerin AI Shopping Assistant floating widget
│   │   │   ├── ProductCard.jsx         # Responsive product item card with touch steppers
│   │   │   ├── OffersDeals.jsx         # Offers & discount coupons showcase
│   │   │   ├── DeliveryInformation.jsx # 10-Minute SLA & Dark store logistics details
│   │   │   ├── ReturnRefund.jsx        # 100% Freshness Guarantee & 3-step return policy
│   │   │   ├── FAQ.jsx                 # Searchable help center & categorized accordion
│   │   │   ├── PaymentMethods.jsx      # PCI-DSS security & accepted payment methods
│   │   │   ├── Contact.jsx             # 24/7 Customer support contact directory
│   │   │   ├── ScratchCardModal.jsx    # HTML5 Canvas scratch & win card with confetti
│   │   │   ├── RecipeBundles.jsx       # 1-Click Smart Meal Kits & recipe combo packs
│   │   │   └── Navbar.jsx              # Responsive navigation header with 1-click GPS
│   │   ├── pages/
│   │   │   ├── BikerMode.jsx           # Delivery Biker App: Shift toggle, GPS nav & OTP confirm
│   │   │   ├── seller/
│   │   │   │   ├── SellerLayout.jsx    # Admin layout with mobile bottom navigation bar
│   │   │   │   ├── FleetBikers.jsx     # Admin fleet dispatch & rider assignment table
│   │   │   │   ├── Dashboard.jsx       # Dark store executive command center
│   │   │   │   ├── Orders.jsx          # Live dispatch & status fulfillment board
│   │   │   │   ├── AddProduct.jsx      # SKU creation with live margin calculator
│   │   │   │   └── ProductList.jsx     # Dual-view responsive stock & inventory manager
│   │   │   ├── Home.jsx                # Landing page with trust cards & recipe bundles
│   │   │   ├── AllProducts.jsx         # Full grocery catalog with live search & filters
│   │   │   ├── ProductCategory.jsx     # Department-specific product catalog
│   │   │   ├── ProductDetails.jsx      # Product showcase with related recommendations
│   │   │   ├── MyOrders.jsx            # Order history with cancellation & live tracking
│   │   │   ├── AddAddress.jsx          # Saved addresses manager with GPS detector
│   │   │   └── Cart.jsx                # Checkout summary with promo codes & address selector
│   │   ├── App.jsx                     # Root application router with ScrollToTop listener
│   │   └── main.jsx                    # React 19 root bootstrap
│   ├── Dockerfile                      # Multi-stage build with NGINX Alpine
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml                  # Full-stack orchestration (Frontend, Backend, Redis)
└── README.md
```

---

## Complete REST API Reference

### Delivery Biker & Fleet Operations (`/api/order`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/order/biker/active` | Retrieve assigned active delivery orders for a rider | Public |
| `POST` | `/api/order/biker/status` | Update trip fulfillment status (`Out for Delivery`, `Delivered`) | Public |
| `POST` | `/api/order/biker/verify-otp` | Verify customer's 4-digit OTP and complete delivery safely | Public |
| `GET` | `/api/order/fleet` | Get full dark store delivery fleet roster & telemetry | Public |
| `POST` | `/api/order/assign-biker` | Admin assigns an order to a specific delivery rider | Seller JWT |
| `GET` | `/api/order/track/:orderId` | Live customer tracking with ETA, Biker profile & OTP | Public |

### Orders & Dark Store Management (`/api/order`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/order/coupon` | Validate discount coupon against minimum order value | Public |
| `POST` | `/api/order/cod` | Place Cash on Delivery order | JWT |
| `POST` | `/api/order/stripe` | Create Stripe checkout payment session | JWT |
| `GET` | `/api/order/user` | Fetch customer order history | JWT |
| `POST` | `/api/order/cancel` | Cancel order before packing and initiate refund | JWT |
| `GET` | `/api/order/telemetry/:orderId` | Real-time rider telemetry (SLA, speed, distance, cold-chain) | JWT |
| `GET` | `/api/order/seller` | Fetch all dark store dispatch orders | Seller JWT |
| `POST` | `/api/order/status` | Advance order status in fulfillment pipeline | Seller JWT |
| `GET` | `/api/order/stats` | Dark store analytics (Revenue, Pending, SKUs) | Seller JWT |

### Catalog & AI Assistant (`/api/product`, `/api/chat`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/product/list` | Retrieve all active grocery products (Redis cached) | Public |
| `POST` | `/api/product/add` | Add new SKU with multi-image upload | Seller JWT |
| `POST` | `/api/product/stock` | Toggle in-stock / out-of-stock SKU availability | Seller JWT |
| `POST` | `/api/product/delete` | Remove SKU from catalog | Seller JWT |
| `POST` | `/api/chat` | Grocerin AI assistant with dynamic catalog grounding | Public |

---

## Getting Started & Local Setup

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm** or **yarn**
- **MongoDB Atlas** connection string (or local MongoDB)
- **Google Gemini API Key**
- **Cloudinary Account** (for product image uploads)
- **Stripe Secret Key** (for online card checkout)

---

### Step-by-Step Installation

#### 1. Clone the repository
```bash
git clone https://github.com/Satyam6201/Grocerin.git
cd Grocerin
```

#### 2. Configure Backend Environment
Create a `.env` file in the `Backend/` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
REDIS_URL=redis://localhost:6379
```

#### 3. Start Backend Server
```bash
cd Backend
npm install
npm run server
```
*Backend API will run at `http://localhost:5000`.*

#### 4. Configure Frontend Environment & Start
Create a `.env` file in the `Frontend/` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

```bash
cd ../Frontend
npm install
npm run dev
```
*Frontend application will run at `http://localhost:5173`.*

---

## Docker Multi-Stage Deployment

Run the complete full-stack environment (Frontend with NGINX, Backend Node.js API, and Redis) with a single Docker command:

```bash
docker-compose up --build -d
```

- **Web Application**: `http://localhost:80`
- **Delivery Biker Terminal**: `http://localhost:80/biker`
- **Admin Fleet Dispatcher**: `http://localhost:80/seller/bikers`
- **Backend API**: `http://localhost:5000`
- **Redis Cache**: `localhost:6379`

To stop and remove containers:
```bash
docker-compose down
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
