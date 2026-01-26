
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { ShoppingBag, Heart, Check, Share2, Ruler, ShieldCheck, MapPin } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [pincode, setPincode] = useState('');
  const [isCheckSuccess, setIsCheckSuccess] = useState<boolean | null>(null);

  const product = state.products.find((p) => p.id === id);
  if (!product) return <div className="p-20 text-center">Product not found</div>;

  useEffect(() => {
    if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    if (product.colors.length > 0) setSelectedColor(product.colors[0]);
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, selectedSize, selectedColor, quantity: 1 }
    });
    navigate('/cart');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckSuccess(pincode.length === 6);
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-xl bg-white border border-gray-100 sticky top-32">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 border-2 border-transparent hover:border-red-500 transition-all">
                <img src={img} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">{product.category} • {product.theme}</span>
            <h1 className="text-4xl font-black uppercase text-gray-900 mt-2 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded gap-1">
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-yellow-500 font-bold">★</span>
              </div>
              <span className="text-sm text-gray-500 font-medium">({product.reviewsCount} verified reviews)</span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-4xl font-black text-red-600">₹{product.price}</span>
            <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-10 flex items-center justify-between">
            <div>
              <p className="text-red-700 font-black text-sm uppercase mb-1 flex items-center gap-2">
                <ShieldCheck size={18} /> Exclusive Member Price
              </p>
              <p className="text-red-600 text-xs font-medium">Get this for ₹{product.memberPrice} with Membership</p>
            </div>
            <button className="text-red-700 font-bold text-sm border-b-2 border-red-700">JOIN NOW</button>
          </div>

          {/* Size Selector */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold uppercase tracking-wider">Select Size</span>
              <button className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700">
                <Ruler size={14} /> SIZE CHART
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-14 h-14 rounded-xl font-bold flex items-center justify-center border-2 transition-all ${
                    selectedSize === size ? 'bg-black text-white border-black shadow-lg scale-105' : 'bg-white text-gray-800 border-gray-200 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery Checker */}
          <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-4">
              <MapPin size={18} /> Check for Delivery
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input 
                type="text" 
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter Pincode" 
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-red-500 outline-none" 
              />
              <button type="submit" className="bg-black text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors uppercase">Check</button>
            </form>
            {isCheckSuccess !== null && (
              <p className={`text-xs mt-3 font-bold ${isCheckSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isCheckSuccess ? '✓ Delivery available by Wed, 24th Oct' : '✕ Sorry, we don\'t deliver to this pincode yet'}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-10 sticky bottom-4 lg:relative">
            <button 
              onClick={handleAddToCart}
              className="flex-[2] bg-red-600 text-white flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg hover:bg-red-700 shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag size={24} /> ADD TO CART
            </button>
            <button className="flex-1 bg-white border-2 border-gray-200 flex items-center justify-center py-5 rounded-2xl text-gray-800 hover:border-red-600 hover:text-red-600 transition-all">
              <Heart size={24} />
            </button>
          </div>

          {/* Details Tabs */}
          <div className="border-t border-gray-100 pt-8 space-y-6">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-2">Product Description</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{product.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Fabric</h4>
                <p className="text-sm font-bold">100% Biowash Cotton</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Fit</h4>
                <p className="text-sm font-bold">Comfort Oversized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
