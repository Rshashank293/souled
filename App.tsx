
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store.tsx';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { ProductDetail } from './pages/ProductDetail.tsx';
import { Cart } from './pages/Cart.tsx';
import { ProductsPage } from './pages/Products.tsx';
import { Checkout } from './pages/Checkout.tsx';
import { Account } from './pages/Account.tsx';
import { Tracking } from './pages/Tracking.tsx';
import { AdminDashboard } from './pages/AdminDashboard.tsx';
import { Community } from './pages/Community.tsx';
import { AIChatbot } from './components/AIChatbot.tsx';
import { Membership } from './pages/Membership.tsx';
import { Wishlist } from './pages/Wishlist.tsx';

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
            <Route path="/membership" element={<Membership />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<div className="p-32 text-center text-4xl font-black uppercase dark:text-white">Smart Notifications</div>} />
          </Routes>
          <AIChatbot />
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
