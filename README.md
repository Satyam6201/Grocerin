# Grocerin - High-Performance Quick-Commerce Grocery Platform

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=flat-square)](https://github.com/Satyam6201/Grocerin)
[![Docker Support](https://img.shields.io/badge/Docker-Multi--Stage-blue?style=flat-square&logo=docker)](https://github.com/Satyam6201/Grocerin)
[![Redis](https://img.shields.io/badge/Redis-Cache%20%26%20Rate%20Limit-DC382D?style=flat-square&logo=redis)](https://github.com/Satyam6201/Grocerin)
[![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-8E75C4?style=flat-square&logo=google)](https://github.com/Satyam6201/Grocerin)
[![Frontend](https://img.shields.io/badge/Frontend-React%2019%20%7C%20Vite%20%7C%20TailwindCSS-61DAFB?style=flat-square&logo=react)](https://github.com/Satyam6201/Grocerin)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=flat-square&logo=node.js)](https://github.com/Satyam6201/Grocerin)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb)](https://github.com/Satyam6201/Grocerin)
[![Payments](https://img.shields.io/badge/Payments-Stripe%20API-635BFF?style=flat-square&logo=stripe)](https://github.com/Satyam6201/Grocerin)

A production-grade, ultra-fast 10-minute grocery delivery platform engineered to effortlessly handle 1-2 million requests. Built with multi-tier Redis caching, connection-pooled database clustering, Google Gemini conversational intelligence, automated GPS/PIN geolocation, and Dark Store fulfillment operations.

---

## Architecture Overview

```
+-----------------------------------------------------------------------------------+
|                                   CLIENT LAYER                                    |
|  React 19 + Vite + Tailwind CSS + Context API + React Icons                       |
|  - GPS Geolocation Engine (Auto-detects Locality & 6-digit PIN code)              |
|  - Gemini AI Shopping Assistant (Dynamic Catalog Grounding & Recipe Bundles)      |
|  - Amazon-style 3D Animated Security Padlock & OTP Password Recovery              |
|  - Quick-Commerce 10-Minute Dispatch Tracking Bar                                 |
+-----------------------------------------------------------------------------------+
                                         |
                                         | HTTPS / REST JSON
                                         v
+-----------------------------------------------------------------------------------+
|                               EDGE & REVERSE PROXY                                |
|  NGINX Reverse Proxy (Gzip, HTTP/2, Cache-Control, Security Headers)              |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                                   BACKEND API                                     |
|  Node.js + Express.js + Compression (Level 6) + Helmet + ETags                     |
|  - Global API Limiter (500 req / 15m)                                             |
|  - Sensitive Auth Limiter (15 req / 15m)                                          |
|  - Order Spam Limiter (20 req / 30m)                                              |
|  - ChatBot LLM Grounding Pipeline                                                 |
+-----------------------------------------------------------------------------------+
         |                                |                                   |
         v                                v                                   v
+------------------+             +------------------+                +------------------+
|   CACHE LAYER    |             |   PERSISTENCE    |                |    AI ENGINE     |
|  Redis (ioredis) |             |  MongoDB Atlas   |                |  Google Gemini   |
|  - Catalog Cache |             |  - 100 Conn Pool |                |  - Flash-Lite    |
|  - Fallback Dict |             |  - Index Shards  |                |  - Grounded RAG  |
+------------------+             +------------------+                +------------------+
```

---

## Key Engineering Highlights

### 1. High-Scale Concurrency Architecture (1-2M Requests Ready)
- **Database Connection Pooling**: Configured with `maxPoolSize: 100`, `minPoolSize: 10`, and `socketTimeoutMS: 45000` to prevent connection starvation during peak traffic spikes.
- **Express Optimization**: Explicit `trust proxy: 1`, disabled `x-powered-by` header, strong ETags, and Gzip compression with a 1KB threshold.
- **HTTP Caching**: High-throughput catalog endpoints emit `Cache-Control: public, max-age=30, stale-while-revalidate=60` headers, allowing edge proxies and CDNs to serve repeated reads.

### 2. Google Gemini Conversational Shopping Assistant
- **Dynamic Catalog Grounding**: Real-time keyword parser inspects user queries (e.g. paneer, milk, apples, oil) and injects matching active SKUs, live stock status, and prices directly into the LLM context.
- **Instant Recipe & Budget Bundles**: Built-in intelligence for meal bundles with itemized prices (e.g. Paneer Butter Masala ~₹240, Healthy Breakfast ~₹295, Veg Biryani ~₹320, Evening Chai ~₹170).
- **Domain Guardrails**: Full grounding on Grocerin's 10-minute SLA, delivery fees (free on ₹499+), coupons (`GROCER100`, `GROCER250`), payment gateways, and 24-hour return policies.
- **Emoji-Free Output Pipeline**: Automated sanitization layer strips raw unicode emojis to preserve a crisp, clean aesthetic.

### 3. Dual-Engine GPS & Postal PIN Code Detection
- Automatic user locality and 6-digit PIN code resolution via HTML5 Geolocation API.
- Primary reverse-geocoding powered by **BigDataCloud API**.
- Resilient secondary fallback powered by **OpenStreetMap Nominatim API** to guarantee accurate postal code retrieval across suburban and rural coordinates.
- Single-click GPS address auto-fill with visual radar ping animation.

### 4. Physical 3D Animated Padlock & Auth Security
- Custom Amazon-inspired physical 3D padlock component with spring-loaded shackle animation on focus and validation.
- Real-time password complexity evaluator measuring length, casing, numbers, and symbols.
- Interactive toggle for password peek with stateful padlock unlocked visual.
- 6-digit OTP verification flow allowing customers to reset and customize passwords after forgetting them.
- JWT session cookies with `HttpOnly` and `SameSite` flags.

### 5. High-Throughput Redis Caching & In-Memory Fallback
- `ioredis` client with non-blocking, non-crashing initialization.
- Automatic fallback to an internal TTL cache dictionary if Redis is offline or disconnected, ensuring zero downtime.
- Proactive cache invalidation on product creation, deletion, or stock status update.
- Microservice health probe exposed at `/health`.

### 6. Triple-Layer DDoS & Brute-Force Rate Limiting
- **Global API Limiter**: Max 500 requests per 15-minute sliding window per IP.
- **Authentication Limiter**: Max 15 attempts per 15 minutes to thwart credential-stuffing.
- **Order Placement Limiter**: Max 20 checkout attempts per 30 minutes to eliminate bot checkouts.

### 7. Dark Store Executive Command Center
- Real-time dispatch console for hub managers.
- Multi-stage order fulfillment pipeline: `Order Placed` -> `Confirmed` -> `Packing` -> `Out for Delivery` -> `Delivered`.
- SKU inventory manager with live in-stock toggles and permanent catalog purging.
- Dynamic profit margin and customer discount percentage calculators.

### 8. 100% Vector Icon Standard
- Complete elimination of raw unicode emojis across all customer and admin surfaces.
- Standardized SVG vector rendering using `react-icons/hi2` and `lucide-react`.

---

## Repository Structure

```
Grocerin/
├── Backend/                            # Node.js + Express Scalable API Server
│   ├── configs/
│   │   ├── cloudinary.js               # Cloudinary CDN media configuration
│   │   ├── db.js                       # MongoDB Atlas connection pooling (maxPool: 100)
│   │   └── redis.js                    # Redis client with in-memory TTL fallback
│   ├── controllers/
│   │   ├── addressController.js        # Saved addresses CRUD
│   │   ├── cartController.js           # Stateful user cart synchronization
│   │   ├── chatController.js           # Gemini AI shopping assistant with catalog grounding
│   │   ├── orderController.js          # Stripe webhooks, COD & seller status engine
│   │   ├── productController.js        # Catalog endpoints with Redis & HTTP cache
│   │   ├── sellerController.js         # Dark store admin authentication
│   │   └── userController.js           # Customer registration, JWT login, OTP reset & profile
│   ├── middlewares/
│   │   ├── auth.js                     # Customer JWT verification middleware
│   │   ├── authSeller.js               # Dark store manager JWT verification
│   │   ├── multer.js                   # Multi-part form-data image buffer parser
│   │   └── rateLimiter.js              # Express rate-limiting middleware rules
│   ├── models/
│   │   ├── Address.js                  # Delivery address Mongoose schema
│   │   ├── Order.js                    # Order schema with pipeline states & Stripe IDs
│   │   ├── Product.js                  # Product catalog schema with stock status
│   │   └── User.js                     # User schema with salted password hashes & OTP
│   ├── routes/
│   │   ├── addressRoute.js             # /api/address endpoints
│   │   ├── cartRoute.js                # /api/cart endpoints
│   │   ├── chatRoute.js                # /api/chat Gemini assistant endpoint
│   │   ├── orderRoute.js               # /api/order endpoints
│   │   ├── productRoute.js             # /api/product endpoints
│   │   ├── sellerRoute.js              # /api/seller endpoints
│   │   └── userRoute.js                # /api/user endpoints
│   ├── .dockerignore
│   ├── Dockerfile                      # Node.js Alpine production container
│   ├── package.json
│   └── server.js                       # Express server entry point & health check
│
├── Frontend/                           # React 19 + Vite Client Application
│   ├── public/
│   │   ├── favicon.svg                 # SVG favicon
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── assets.js               # Category metadata & bundled imagery
│   │   ├── components/
│   │   │   ├── seller/
│   │   │   │   └── SellerLogin.jsx     # Dark store login modal with animated padlock
│   │   │   ├── AnimatedPadlock.jsx     # Reusable 3D physical lock component
│   │   │   ├── BestSeller.jsx          # Trending grocery showcase
│   │   │   ├── CartDrawer.jsx          # Quick-commerce sliding cart overlay
│   │   │   ├── CategoryNav.jsx         # Sticky grocery department navigation bar
│   │   │   ├── ChatBot.jsx             # Floating AI shopping assistant with quick prompts
│   │   │   ├── DeliveryInformation.jsx # 10-Minute delivery SLA & dark store policy
│   │   │   ├── FAQ.jsx                 # Dynamic accordion search FAQs
│   │   │   ├── FeaturedSection.jsx     # Value proposition cards
│   │   │   ├── Footer.jsx              # Production footer with coupon unlock & quick links
│   │   │   ├── LocationModal.jsx       # GPS location selector with PIN detection
│   │   │   ├── Login.jsx               # Amazon-style security login & OTP recovery modal
│   │   │   ├── MainBanner.jsx          # Promotional carousel banner
│   │   │   ├── MobileCartBar.jsx       # Floating mobile quick checkout pill
│   │   │   ├── Navbar.jsx              # Header with location, search, auth & cart
│   │   │   ├── OffersDeals.jsx         # Discount coupons & promo banners
│   │   │   ├── ProductCard.jsx         # Product card with instant quantity counter
│   │   │   └── ReturnRefund.jsx        # 24-Hour freshness guarantee & refund policy
│   │   ├── context/
│   │   │   └── AppContext.jsx          # Global context (auth, cart, GPS, catalog)
│   │   ├── pages/
│   │   │   ├── seller/
│   │   │   │   ├── AddProduct.jsx      # Multi-image SKU creator & margin calculator
│   │   │   │   ├── Dashboard.jsx       # Dark store executive command center
│   │   │   │   ├── Orders.jsx          # Live dispatch & status fulfillment board
│   │   │   │   ├── ProductList.jsx     # Stock toggle & inventory management
│   │   │   │   └── SellerLayout.jsx    # Dark store sidebar navigation shell
│   │   │   ├── AddAddress.jsx          # 1-Click GPS address form with PIN code
│   │   │   ├── AllProducts.jsx         # Catalog search & category grid
│   │   │   ├── Cart.jsx                # Full shopping cart summary
│   │   │   ├── Home.jsx                # Landing page
│   │   │   ├── MyOrders.jsx            # Order history with live pipeline progress
│   │   │   ├── ProductCategory.jsx     # Department category browsing
│   │   │   └── ProductDetails.jsx      # Item view with specs & recommendations
│   │   ├── App.jsx                     # Router outlet, ChatBot & modal mounts
│   │   ├── index.css                   # Tailwind CSS imports & animations
│   │   └── main.jsx                    # React 19 root bootstrap
│   ├── .dockerignore
│   ├── Dockerfile                      # Multi-stage build with NGINX Alpine
│   ├── nginx.conf                      # Production NGINX configuration
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml                  # Full-stack composition (Frontend, Backend, Redis)
└── README.md
```

---

## API Reference

### Health & DevOps
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | System health check (Uptime, Memory RSS, Redis status) |
| `GET` | `/` | API status verification ping |

### AI Shopping Assistant (`/api/chat`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/chat` | Conversational grocery AI with dynamic catalog grounding and recipes | Public (Rate Limited) |

### Authentication & Users (`/api/user`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/user/register` | Register new user account | Public |
| `POST` | `/api/user/login` | Authenticate customer via email/password | Public |
| `POST` | `/api/user/forgot-password` | Generate 6-digit OTP to recover forgotten password | Public |
| `POST` | `/api/user/reset-password` | Validate OTP & customize new password with auto-login | Public |
| `GET` | `/api/user/is-auth` | Retrieve authenticated user profile | JWT |
| `GET` | `/api/user/logout` | Clear auth token session cookie | JWT |

### Catalog & Inventory (`/api/product`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/product/list` | Retrieve active products (Redis + HTTP cache) | Public |
| `POST` | `/api/product/add` | Upload product with up to 4 images | Seller JWT |
| `POST` | `/api/product/stock` | Toggle SKU in-stock availability | Seller JWT |
| `POST` | `/api/product/delete` | Permanently remove product SKU | Seller JWT |

### Shopping Cart (`/api/cart`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/cart/update` | Sync local cart state with user account | JWT |

### Delivery Addresses (`/api/address`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/address/add` | Save delivery address (street, city, state, PIN) | JWT |
| `GET` | `/api/address/list` | Fetch saved delivery addresses | JWT |

### Orders & Dark Store Fulfillment (`/api/order`)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/order/cod` | Place Cash on Delivery order | JWT |
| `POST` | `/api/order/stripe` | Create Stripe checkout payment session | JWT |
| `GET` | `/api/order/user` | Fetch customer order history with stages | JWT |
| `GET` | `/api/order/seller` | Fetch all store dispatch orders | Seller JWT |
| `POST` | `/api/order/status` | Advance order status in fulfillment pipeline | Seller JWT |
| `GET` | `/api/order/stats` | Dark store analytics (Revenue, Pending, SKUs) | Seller JWT |

---

## Getting Started

### Prerequisites
- Node.js (v18.x or v20.x+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB daemon)
- Google Gemini API key
- Docker & Docker Compose *(optional, for containerized run)*
- Redis Server *(optional, defaults to resilient in-memory fallback)*

---

### Environment Variables

#### Backend Environment (`Backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/grocerin
JWT_SECRET=your_jwt_super_secret_key_32_chars
CURRENCY=₹

# Google Gemini Generative AI Key
GEMINI_API_KEY=your_gemini_api_key_here

# Redis Cache (Optional - defaults to in-memory fallback if omitted)
REDIS_URL=redis://localhost:6379

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Payment Gateway
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Seller / Admin Master Credentials
SELLER_EMAIL=admin@grocerin.com
SELLER_PASSWORD=AdminSecurePassword123!
```

#### Frontend Environment (`Frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
```

---

### Local Installation & Development

#### 1. Clone the repository
```bash
git clone https://github.com/Satyam6201/Grocerin.git
cd Grocerin
```

#### 2. Setup and run Backend
```bash
cd Backend
npm install
npm run server
```
*Backend server runs on `http://localhost:5000`*

#### 3. Setup and run Frontend
```bash
cd ../Frontend
npm install
npm run dev
```
*Frontend client runs on `http://localhost:5173`*

---

### Docker Deployment

To spin up the entire production infrastructure (Frontend with NGINX, Backend API, and Redis) with a single command:

```bash
docker-compose up --build -d
```

To stop containers:
```bash
docker-compose down
```

---

## Production Security & Scalability Measures

- **Helmet**: Secures HTTP response headers against clickjacking, MIME-sniffing, and XSS.
- **Connection Pooling**: Configured with 100 max pool size for MongoDB Atlas to service massive concurrent request volumes.
- **Gzip Compression**: Compresses JSON payloads and HTML pages at Level 6 with a 1KB threshold.
- **HTTP Cache Control**: 30s cache with 60s stale-while-revalidate for product lists to dramatically cut database read loads.
- **CORS Allowlist**: Configured to restrict origin requests strictly to the verified client URL.
- **Input Sanitization**: Password complexity validation, OTP expiration handling, and parameterized MongoDB binding.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
