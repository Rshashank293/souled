
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { ProductsPage } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Tracking } from './pages/Tracking';
import { AdminDashboard } from './pages/AdminDashboard';
import { Community } from './pages/Community';
import { AIChatbot } from './components/AIChatbot';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/track/:id" element={<Tracking />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/membership" element={<div className="p-32 text-center text-4xl font-black uppercase dark:text-white">Squad Membership Landing Page</div>} />
            <Route path="/wishlist" element={<div className="p-32 text-center text-4xl font-black uppercase dark:text-white">Wishlist Collection</div>} />
            <Route path="/notifications" element={<div className="p-32 text-center text-4xl font-black uppercase dark:text-white">Smart Notifications</div>} />
          </Routes>
          <AIChatbot />
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
