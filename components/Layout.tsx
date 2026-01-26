
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Moon, Sun, Mic, Globe, Zap, Sparkles, MapPin, ChevronDown, Menu } from 'lucide-react';
import { useApp } from '../store';
import { Link, useNavigate } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const startVoiceSearch = () => {
    setIsVoiceActive(true);
    // Simulation of SpeechRecognition
    setTimeout(() => setIsVoiceActive(false), 3000);
  };

  return (
    <div className={`${state.theme === 'dark' ? 'dark bg-neutral-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-500`}>
      {/* Universal Top Bar */}
      <div className="bg-red-600 text-white py-2 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest z-[70] relative">
        <div className="flex gap-6">
          <span className="flex items-center gap-1"><Zap size={10} /> FREE EXPRESS SHIPPING FOR SQUAD</span>
          <span className="hidden md:flex items-center gap-1"><Sparkles size={10} /> 4.9/5 RATED BY 10M+ FANS</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => dispatch({ type: 'SET_CURRENCY', payload: state.currency === 'INR' ? 'USD' : 'INR' })} className="flex items-center gap-1 border-r border-white/20 pr-4 hover:opacity-80 transition-opacity">
              <Globe size={10} /> {state.currency}
           </button>
           <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} className="p-1">
             {state.theme === 'light' ? <Moon size={12} fill="white" /> : <Sun size={12} fill="white" />}
           </button>
        </div>
      </div>

      <header className={`sticky top-0 z-50 h-20 lg:h-24 px-6 lg:px-12 flex items-center justify-between transition-all border-b ${state.theme === 'dark' ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-gray-100'} backdrop-blur-xl`}>
        <div className="flex items-center gap-10">
          <Link to="/" className="text-2xl lg:text-3xl font-black italic tracking-tighter text-red-600">
            SOULSTORE<span className={state.theme === 'dark' ? 'text-white' : 'text-black'}>.</span>
          </Link>
          <nav className="hidden xl:flex gap-8">
            {['MEN', 'WOMEN', 'KIDS', 'THEMES', 'NEW'].map(cat => (
              <Link key={cat} to="/products" className="text-xs font-black tracking-widest hover:text-red-600 transition-colors">{cat}</Link>
            ))}
          </nav>
        </div>

        <div className="flex-1 max-w-xl mx-12 hidden lg:flex items-center bg-gray-100 dark:bg-neutral-800 rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-red-600 transition-all">
           <Search size={18} className="text-gray-400" />
           <input type="text" placeholder="AI Search: Try 'Black Marvel hoodie under 2000'" className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-bold outline-none" />
           <button onClick={startVoiceSearch} className={`${isVoiceActive ? 'text-red-600 animate-pulse' : 'text-gray-400'}`}>
             <Mic size={18} />
           </button>
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
           <button className="p-2 hover:bg-red-50 dark:hover:bg-neutral-800 rounded-full relative" onClick={() => navigate('/account')}>
              <User size={24} />
           </button>
           <button className="relative p-3 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-600/20 hover:scale-105 transition-transform" onClick={() => navigate('/cart')}>
              <ShoppingBag size={24} />
              {state.cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black dark:bg-white dark:text-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{state.cart.length}</span>}
           </button>
        </div>
      </header>

      <main>{children}</main>

      {/* Persistent App Bottom Bar Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-100 dark:border-neutral-800 p-4 flex justify-between items-center z-[100] safe-bottom">
         <Link to="/" className="flex flex-col items-center gap-1 text-red-600">
           <Menu size={20} />
           <span className="text-[9px] font-black uppercase">Home</span>
         </Link>
         <Link to="/products" className="flex flex-col items-center gap-1 text-gray-400">
           <Search size={20} />
           <span className="text-[9px] font-black uppercase">Search</span>
         </Link>
         <div className="relative -top-6">
            <button className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white dark:border-neutral-900">
               <Sparkles size={24} />
            </button>
         </div>
         <Link to="/account" className="flex flex-col items-center gap-1 text-gray-400">
           <User size={20} />
           <span className="text-[9px] font-black uppercase">Profile</span>
         </Link>
         <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-400">
           <ShoppingBag size={20} />
           <span className="text-[9px] font-black uppercase">Cart</span>
         </Link>
      </div>
    </div>
  );
};
