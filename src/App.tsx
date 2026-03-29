import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import { FloatingContactButtons, Footer, Navbar } from './components';
import { CartProvider } from './context';
import {
  About,
  AdminDashboard,
  AdminLogin,
  Cart,
  Checkout,
  Contact,
  Gallery,
  Home,
  ProductDetail,
  Shop,
  Tracking,
} from './pages';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-[#fcfaf7] text-stone-900">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContactButtons />
        </div>
      </Router>
    </CartProvider>
  );
}
