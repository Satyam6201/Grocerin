# Grocerin Client - React 19 Frontend

The client-side single page application for the Grocerin Quick-Commerce Grocery Platform, built with React 19, Vite, Tailwind CSS, and vector icons.

---

## Highlights

- **Vite & React 19**: Ultra-fast HMR and optimized production bundling.
- **GPS Location & PIN Code Auto-Fill**: Dual-engine geocoding (BigDataCloud + OpenStreetMap Nominatim fallback) detects both the locality and 6-digit postal PIN code.
- **Animated Security Padlock**: Amazon-style physical 3D lock that springs open dynamically as password criteria are met.
- **Dark Store Management**: Executive command center, live order pipeline switcher, SKU inventory controls, and pricing calculators.
- **100% Vector Icons**: Crisp SVG rendering powered by `react-icons/hi2` and `lucide-react` with zero raw emojis.
- **Docker Ready**: Multi-stage Dockerfile packaging production assets into an NGINX Alpine container.

---

## Directory Layout

```
src/
├── assets/          # Bundled images, product icons, and category definitions
├── components/      # UI components (Navbar, CartDrawer, LocationModal, AnimatedPadlock, etc.)
│   └── seller/      # Dark store login modal and seller widgets
├── context/         # AppContext (Auth, Cart, GPS location, Catalog state)
├── pages/           # Customer pages (Home, Cart, AllProducts, ProductCategory, MyOrders, AddAddress)
│   └── seller/      # Dark store command center (Dashboard, ProductList, AddProduct, Orders)
├── App.jsx          # Application route definitions
├── index.css        # Tailwind styling & animations
└── main.jsx         # Vite entry point
```

---

## Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Environment Configuration

Create a `.env` file in the `Frontend/` folder:

```env
VITE_BACKEND_URL=http://localhost:5000
```
