# Grocerin - High-Performance Quick-Commerce Grocery Platform (Production & Delivery Fleet Edition)

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge&logo=github-actions)](https://github.com/Satyam6201/Grocerin)
[![Docker Support](https://img.shields.io/badge/Docker-Multi--Stage-blue?style=for-the-badge&logo=docker)](https://github.com/Satyam6201/Grocerin)
[![Redis](https://img.shields.io/badge/Redis-Sub--15ms%20Cache%20%26%20TTL-DC382D?style=for-the-badge&logo=redis)](https://github.com/Satyam6201/Grocerin)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%20RAG-8E75C4?style=for-the-badge&logo=google)](https://github.com/Satyam6201/Grocerin)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%20%7C%20TailwindCSS%204-61DAFB?style=for-the-badge&logo=react)](https://github.com/Satyam6201/Grocerin)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js)](https://github.com/Satyam6201/Grocerin)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas%20(100%20Pool)-47A248?style=for-the-badge&logo=mongodb)](https://github.com/Satyam6201/Grocerin)
[![Payments](https://img.shields.io/badge/Payments-Stripe%20API%20%26%20COD-635BFF?style=for-the-badge&logo=stripe)](https://github.com/Satyam6201/Grocerin)

> **Production-ready, ultra-fast 10-minute grocery delivery platform engineered to handle 1–2 million high-concurrency requests.** Features multi-tier Redis caching, connection-pooled database clustering, Google Gemini RAG grounding, Live Delivery Biker Mode app, Admin Fleet Dispatch management, Customer Live Radar tracking with OTP verification, and quick seller operations.

---

## 📑 Table of Contents
1. [Architecture & System Design](#-architecture--system-design)
2. [Standout Modules & Capabilities](#-standout-modules--capabilities)
3. [Full Engineering Stack](#-full-engineering-stack)
4. [Repository Structure](#-repository-structure)
5. [Complete API Reference](#-complete-api-reference)
6. [Getting Started & Local Development](#-getting-started--local-development)
7. [Docker Multi-Stage Deployment](#-docker-multi-stage-deployment)
8. [Production Scalability & Reliability Measures](#-production-scalability--reliability-measures)

---

## 🏗 System Architecture

```
+----------------------------------------------------------------------------------------------------+
|                                         CLIENT LAYER                                               |
|  React 19 + Vite 7 + Tailwind CSS 4 + Context API + React Icons + Canvas Confetti                 |
|  - Delivery Biker Mode App (/biker, /rider): Shift toggle, Google Maps navigation & OTP verify     |
|  - Admin Delivery Fleet Dispatch (/seller/bikers): Roster telemetry & 1-click trip assignment      |
|  - Live Customer Radar (/track-order, /tractOrder): Live ETA, Biker profile, OTP code & map        |
|  - Dark Store Seller Command Center (/seller): Flash sales, stock management, instant selling      |
|  - SDE Architecture & Live Performance Telemetry Console (/health ping & metrics)                  |
|  - Web Speech API Voice Search with live audio waveform animation                                 |
|  - Gamified HTML5 Canvas Scratch & Win Promo Card with confetti particle engine                    |
|  - 1-Click Smart Meal Kits / Recipe Bundles (Instant Batch Cart Addition)                          |
|  - Verified Buyer Reviews with 5-Star distribution histograms & helpful upvoting                   |
|  - GPS Geolocation Engine (Auto-detects Locality & 6-digit PIN code)                               |
|  - Google Gemini AI Shopping Assistant (Dynamic Catalog Grounding & Budget Bundles)                |
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
|  - Dynamic Coupon Engine (GROCER100, GROCER250, FREEDEL, SUPERDEV, FIRSTBITE, NIGHTOWL)            |
|  - Order Cancellation & Refund Evaluation Pipeline                                                 |
|  - ChatBot LLM Grounding & Keyword Extractor Pipeline                                             |
+----------------------------------------------------------------------------------------------------+
         |                                |                                   |
         v                                v                                   v
+------------------+             +------------------+                +------------------+
|   CACHE LAYER    |             |   PERSISTENCE    |                |    AI ENGINE     |
|  Redis (ioredis) |             |  MongoDB Atlas   |                |  Google Gemini   |
|  - Catalog Cache |             |  - 100 Conn Pool |                |  - Flash-Lite    |
|  - Fallback Dict |             |  - Index Shards  |                |  - Grounded RAG  |
|  - TTL Invalidate|             |  - ACID Webhooks |                |  - Zero-Emoji    |
+------------------+             +------------------+                +------------------+
```

---

## 🚀 Standout Modules & Capabilities

### 1. 🛵 Delivery Biker Mode (Rider App Terminal)
- **Live Shift Control**: Toggle between On Duty (Online) and Off Duty (Break) with real-time battery status and shift earnings tracking.
- **Rider Switching**: Switch between active dark store delivery partners (Vikram Rathore, Amit Kumar, Priya Singh, Aryan Verma).
- **Turn-by-Turn Navigation**: 1-click Google Maps GPS navigation directly to the customer's delivery coordinates.
- **Customer Direct Call**: Direct `tel:` calling integration for frictionless customer coordination.
- **Secure OTP Handover**: Rider enters customer's 4-digit verification code to confirm package delivery and mark order delivered.

### 2. 🛡️ Admin Delivery Fleet Management (`/seller/bikers`)
- **Fleet Roster**: Admin dashboard showing all active riders, live status (`Available`, `On Delivery`, `Offline`), EV battery percentage, and driver ratings.
- **1-Click Order Assignment**: Admin can assign unassigned orders to any active delivery biker in real-time.
- **Hub Dispatch Metrics**: Displays average SLA completion time (7.8 mins), active in-flight trips, and today's total delivered volume.

### 3. 📡 Customer Live Order Tracking Radar (`/track-order`, `/tractOrder`)
- **Real-Time Stage Pipeline**: `Order Placed` -> `Dark Store Packing` -> `Out for Delivery` -> `Delivered`.
- **4-Digit Delivery Verification OTP**: Prominently presented on customer's screen for handover verification.
- **Assigned Rider Card**: Displays rider name, EV vehicle registration number, driver rating, and direct phone call button.
- **Interactive Live Map Radar**: Opens real-time animated SVG delivery route simulation with countdown timer.

### 4. 🏪 High-Performance Dark Store Seller Portal (`/seller`)
- **Quick Selling**: 1-click flash sale activation, instant stock toggling, and fast SKU creation with margin calculation.
- **Live Inventory Health**: Instant warnings for out-of-stock items and low-inventory SKUs.
- **Real-Time Revenue Analytics**: Tracks gross sales, completed orders, and active dark store packing queues.

### 5. ⚡ SDE Architecture & Live Performance Telemetry Console
- Real-time client-to-server latency ping measurement (ms).
- Live Redis sub-15ms cache hit/miss ratio, MongoDB Atlas 100-connection pool telemetry, and Gemini RAG token breakdown.

---

## 🛠 Full Engineering Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), React Router v7, React Icons (`react-icons/hi2`, `react-icons/fa6`), Canvas Confetti, Web Speech API, HTML5 Canvas |
| **Backend** | Node.js (v20+), Express.js, ioredis, Mongoose, Multer, Cloudinary SDK, Stripe SDK, Helmet, Compression, Express Rate Limit |
| **Databases** | MongoDB Atlas (Pooled 100-connection cluster), Redis (Sub-15ms cache with in-memory TTL dictionary fallback) |
| **Generative AI** | Google Gemini Generative AI (Catalog RAG Grounding) |
| **DevOps & Containers** | Docker (Multi-stage Alpine), Docker Compose, NGINX Reverse Proxy, GitHub Actions CI |

---

## 📂 Repository Structure

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
│   │   │   ├── SdeArchitectureModal.jsx# Live System Performance & Telemetry Console
│   │   │   ├── VoiceSearch.jsx         # Web Speech API voice search with audio waves
│   │   │   ├── ScratchCardModal.jsx    # HTML5 Canvas scratch & win card with confetti
│   │   │   ├── RecipeBundles.jsx       # 1-Click Smart Meal Kits & recipe combo packs
│   │   │   └── Navbar.jsx              # Navigation header with Biker Mode & SDE console
│   │   ├── pages/
│   │   │   ├── BikerMode.jsx           # Delivery Biker App: Shift toggle, GPS nav & OTP confirm
│   │   │   ├── seller/
│   │   │   │   ├── FleetBikers.jsx     # Admin fleet dispatch & rider assignment table
│   │   │   │   ├── Dashboard.jsx       # Dark store executive command center
│   │   │   │   ├── Orders.jsx          # Live dispatch & status fulfillment board
│   │   │   │   └── ProductList.jsx     # Stock toggle & inventory management
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── MyOrders.jsx            # Order history with Live Telemetry
│   │   │   └── Cart.jsx                # Full shopping cart summary
│   │   ├── App.jsx                     # Root router mounting /biker and /seller/bikers
│   │   └── main.jsx                    # React 19 root bootstrap
│   ├── Dockerfile                      # Multi-stage build with NGINX Alpine
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml                  # Full-stack orchestration (Frontend, Backend, Redis)
└── README.md
```

---

## 📡 Complete API Reference

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
| `POST` | `/api/order/coupon` | Validate discount coupon against min order value | Public |
| `POST` | `/api/order/cod` | Place Cash on Delivery order | JWT |
| `POST` | `/api/order/stripe` | Create Stripe checkout payment session | JWT |
| `GET` | `/api/order/user` | Fetch customer order history | JWT |
| `POST` | `/api/order/cancel` | Cancel order before packing and initiate refund | JWT |
| `GET` | `/api/order/telemetry/:orderId` | Real-time rider telemetry (SLA, speed, distance, cold-chain) | JWT |
| `GET` | `/api/order/seller` | Fetch all dark store dispatch orders | Seller JWT |
| `POST` | `/api/order/status` | Advance order status in fulfillment pipeline | Seller JWT |
| `GET` | `/api/order/stats` | Dark store analytics (Revenue, Pending, SKUs) | Seller JWT |

---

## 💻 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB daemon)
- **Google Gemini API key** (free tier supported)
- **Redis Server** *(optional: automatic fallback to internal in-memory dictionary cache)*

---

### Local Run Commands

#### 1. Clone the repository
```bash
git clone https://github.com/Satyam6201/Grocerin.git
cd Grocerin
```

#### 2. Start the Backend API
```bash
cd Backend
npm install
npm run server
```
*API Server listens on `http://localhost:5000` with `/health` probe.*

#### 3. Start the Frontend Client
```bash
cd ../Frontend
npm install
npm run dev
```
*Client application runs on `http://localhost:5173`.*

---

## 🐳 Docker Multi-Stage Deployment

Run the complete production ecosystem (Frontend with NGINX, Backend Node.js API, and Redis) with a single command:

```bash
docker-compose up --build -d
```

- **Frontend Client**: `http://localhost:80`
- **Delivery Biker App**: `http://localhost:80/biker`
- **Admin Fleet Manager**: `http://localhost:80/seller/bikers`
- **Backend API**: `http://localhost:5000`
- **Redis Cache**: `localhost:6379`

To gracefully shut down containers:
```bash
docker-compose down
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
