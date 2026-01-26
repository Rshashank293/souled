
import React from 'react';
import { useApp } from '../store';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Wishlist: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  
  const wishlistedItems = state.products.filter(p => state.wishlist.includes(p.id));

  if (wishlistedItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-24">
         <div className="w-32 h-32 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
            <Heart size={64} fill="currentColor" />
         </div>
         <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Your Wishlist is Empty</h1>
         <p className="text-gray-500 font-medium text-lg mb-12 text-center max-w-md">Save the items you love to your personal vault and we'll notify you when they drop in price.</p>
         <button 
           onClick={() => navigate('/products')}
           className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-2xl"
         >
           EXPLORE COLLECTIONS
         </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-32">
       <div className="bg-black text-white py-24 px-6 lg:px-12 mb-20 relative overflow-hidden">
          <Sparkles className="absolute top-10 right-10 text-red-600 opacity-20" size={120} />
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mb-4">The <span className="text-red-600">Vault.</span></h1>
          <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">({wishlistedItems.length}) Items Saved for Later</p>
       </div>

       <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlistedItems.map(item => (
            <div key={item.id} className="relative group">
              <ProductCard product={item} />
              <button 
                onClick={() => navigate(`/product/${item.id}`)}
                className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[80%] bg-black text-white py-3 rounded-xl font-black text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-all shadow-2xl translate-y-4 group-hover:translate-y-0"
              >
                SELECT OPTIONS
              </button>
            </div>
          ))}
       </div>

       {/* Recommendation for Empty Slots */}
       <div className="container mx-auto px-6 lg:px-12 mt-32">
          <div className="bg-red-50 p-12 rounded-[4rem] border-2 border-dashed border-red-200 flex flex-col lg:flex-row items-center justify-between gap-10">
             <div>
                <h3 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Need Some <span className="text-red-600">Inspo?</span></h3>
                <p className="text-gray-500 font-medium">Check out what the rest of the squad is wishlisting today.</p>
             </div>
             <Link to="/community" className="bg-white text-red-600 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-3">
               SEE TRENDS <ArrowRight size={16} />
             </Link>
          </div>
       </div>
    </div>
  );
};
