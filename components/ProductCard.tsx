
import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../store';
import { Link } from 'react-router-dom';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { state, dispatch } = useApp();
  const isWishlisted = state.wishlist.includes(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product.id });
  };

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded">NEW</span>
        )}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded">BEST SELLER</span>
        )}
        <button 
          onClick={handleToggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${isWishlisted ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400'}`}
        >
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1 group-hover:text-red-600 transition-colors uppercase">{product.name}</h3>
          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg font-black text-red-600">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
        <div className="bg-red-50 border border-red-100 rounded p-1.5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-red-700">FOR MEMBERS</span>
          <span className="text-xs font-black text-red-700">₹{product.memberPrice}</span>
        </div>
      </div>
    </div>
  );
};
