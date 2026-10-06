import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import CategoryNav from './components/CategoryNav';
import CartDrawer from './components/CartDrawer';
import LocationModal from './components/LocationModal';
import MobileCartBar from './components/MobileCartBar';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home';
import { Toaster } from "react-hot-toast";
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';
import MyOrders from './pages/MyOrders';
import SellerLayout from './pages/seller/SellerLayout';
import Dashboard from './pages/seller/Dashboard';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import FleetBikers from './pages/seller/FleetBikers';
import BikerMode from './pages/BikerMode';
import Loading from './components/Loading';
import SellerLogin from './components/seller/SellerLogin';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import DeliveryInformation from './components/DeliveryInformation';
import PaymentMethods from './components/PaymentMethods';
import ReturnRefund from './components/ReturnRefund';
import BestSeller from './components/BestSeller';
import OffersDeals from './components/OffersDeals';
import TrackOrder from './components/TrackOrder';

import SdeArchitectureModal from './components/SdeArchitectureModal';
import LiveTelemetryModal from './components/LiveTelemetryModal';
import ScratchCardModal from './components/ScratchCardModal';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      const root = document.getElementById('root');
      if (root) root.scrollTop = 0;
    }

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 20);

    return () => clearTimeout(timer);
  }, [pathname, search, hash]);

  return null;
};

const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const isBikerPath = location.pathname.includes("biker") || location.pathname.includes("rider");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='min-h-screen text-gray-800 bg-[#fbfbfa] flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900'>
      <div>
        <ScrollToTop />
        <CartDrawer />
        <LocationModal />
        <MobileCartBar />
        <SdeArchitectureModal />
        <LiveTelemetryModal />
        <ScratchCardModal />

        {!isSellerPath && !isBikerPath && <Navbar />}
        {!isSellerPath && !isBikerPath && <CategoryNav />}
        {!isSellerPath && !isBikerPath && <ChatBot />}

        {showUserLogin && <Login />}

        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#111827',
              color: '#ffffff',
              fontSize: '13px',
              borderRadius: '12px',
              padding: '12px 16px',
            },
          }}
        />
        
        <main className={`${(isSellerPath || isBikerPath) ? "" : "px-4 md:px-12 lg:px-20 xl:px-28"}`}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<AllProducts />} />
            <Route path='/products/:category' element={<ProductCategory />} />
            <Route path='/products/:category/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/add-address' element={<AddAddress />} />
            <Route path='/my-orders' element={<MyOrders />} />
            <Route path='/loader' element={<Loading />} />
            <Route path='/biker' element={<BikerMode />} />
            <Route path='/rider' element={<BikerMode />} />
            
            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              {isSeller && (
                <>
                  <Route index element={<Dashboard />} />
                  <Route path="add-product" element={<AddProduct />} />
                  <Route path="product-list" element={<ProductList />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="bikers" element={<FleetBikers />} />
                </>
              )}
            </Route>
            
            <Route path='/contact' element={<Contact />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/DeliveryInfo' element={<DeliveryInformation />} />
            <Route path='/paymentmethod' element={<PaymentMethods />} />
            <Route path='/returnRefund' element={<ReturnRefund />} />
            <Route path='/best-sellers' element={<BestSeller />} />
            <Route path='/tractOrder' element={<TrackOrder />} />
            <Route path='/track-order' element={<TrackOrder />} />
            <Route path='/offer' element={<OffersDeals />} />
          </Routes>
        </main>
      </div>

      {!isSellerPath && !isBikerPath && <Footer />}
    </div>
  );
};

export default App;
