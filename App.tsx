
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { ProductsPage } from './pages/Products';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Tracking } from './pages/Tracking';
import { Community } from './pages/Community';
import { AIChatbot } from './components/AIChatbot';
import { Membership } from './pages/Membership';
import { Wishlist } from './pages/Wishlist';
import { GamifiedOffers } from './components/GamifiedOffers';

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
            <Route path="/community" element={<Community />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<div className="p-32 text-center text-4xl font-black uppercase dark:text-white">Smart Notifications</div>} />
          </Routes>
          <AIChatbot />
          <GamifiedOffers />
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
