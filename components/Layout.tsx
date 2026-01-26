
import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Moon, Sun, Mic, Globe, Zap, Sparkles, Menu, X, ChevronRight, Star } from 'lucide-react';
import { useApp } from '../store.tsx';
import { Link, useNavigate } from 'react-router-dom';

const MEGA_MENU = {
  MEN: {
    'Top Wear': ['T-Shirts', 'Oversized Tees', 'Shirts', 'Hoodies'],
    'Bottom Wear': ['Joggers', 'Pants', 'Shorts', 'Boxers'],
    'Themes': ['Marvel', 'DC', 'Anime', 'Harry Potter']
  },
  WOMEN: {
    'Clothing': ['Tops', 'Dresses', 'Joggers', 'Hoodies', 'Lounge Sets'],
    'Accessories': ['Caps', 'Bags', 'Socks'],
    'Collections': ['New Arrivals', 'Best Sellers']
  },
  KIDS: {
    'Boys': ['Tees', 'Shorts', 'Joggers'],
    'Girls': ['Dresses', 'Tees', 'Leggings'],
    'Themes': ['Disney', 'Cartoon Network']
  }
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className={`${state.theme === 'dark' ? 'dark bg-neutral-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen transition-colors duration-500`}>
      {/* Dynamic Top Bar */}
      <div className="bg-red-600 text-white py-2 px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest z-[100] relative">
        <div className="flex gap-6">
          <span className="flex items-center gap-1 animate-pulse"><Zap size={10} /> 24HR DISPATCH ON ALL ORDERS</span>
          <span className="hidden md:flex items-center gap-1"><Star size={10} fill="white" /> SQUAD MEMBERS GET EXTRA 20% OFF</span>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} className="p-1">
             {state.theme === 'light' ? <Moon size={12} fill="white" /> : <Sun size={12} fill="white" />}
           </button>
        </div>
      </div>

      <header className={`sticky top-0 z-50 h-20 lg:h-24 px-6 lg:px-12 flex items-center justify-between transition-all border-b ${state.theme === 'dark' ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-gray-100'} backdrop-blur-xl`}>
        <div className="flex items-center gap-10 h-full">
          <Link to="/" className="text-2xl lg:text-3xl font-black italic tracking-tighter text-red-600">
            SOULSTORE<span className={state.theme === 'dark' ? 'text-white' : 'text-black'}>.</span>
          </Link>
          <nav className="hidden xl:flex gap-8 h-full">
            {Object.keys(MEGA_MENU).map(cat => (
              <div 
                key={cat} 
                className="group h-full flex items-center"
                onMouseEnter={() => setActiveMega(cat)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <button className="text-xs font-black tracking-widest hover:text-red-600 transition-colors uppercase py-10">
                  {cat}
                </button>
                {activeMega === cat && (
                  <div className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 shadow-2xl border-t border-gray-100 dark:border-neutral-800 p-12 grid grid-cols-4 gap-12 animate-in fade-in slide-in-from-top-4 duration-300">
                    {Object.entries(MEGA_MENU[cat as keyof typeof MEGA_MENU]).map(([sub, items]) => (
                      <div key={sub}>
                        <h4 className="text-xs font-black uppercase tracking-widest text-red-600 mb-6">{sub}</h4>
                        <ul className="space-y-4">
                          {items.map(item => (
                            <li key={item}>
                              <Link to={`/products?category=${item}`} className="text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition-colors">{item}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="bg-gray-50 dark:bg-neutral-800 p-8 rounded-3xl flex flex-col justify-center">
                       <h4 className="text-xl font-black uppercase italic mb-4">Limited Edition <span className="text-red-600">Drops</span></h4>
                       <p className="text-xs font-medium text-gray-500 mb-6">Exclusive access for Super Squad members only.</p>
                       <Link to="/membership" className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase text-center">Join Squad</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-1 max-w-xl mx-12 hidden lg:flex items-center bg-gray-100 dark:bg-neutral-800 rounded-2xl px-5 py-3 border-2 border-transparent focus-within:border-red-600 transition-all relative">
           <Search size={18} className="text-gray-400" />
           <input 
              type="text" 
              placeholder="Search for Marvel, Anime, T-shirts..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-bold outline-none"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
           />
           {isSearchFocused && (
             <div className="absolute top-full left-0 w-full bg-white dark:bg-neutral-900 mt-2 rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-800 p-6 z-[60] animate-in fade-in zoom-in-95 duration-200">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Trending Searches</p>
                <div className="space-y-3">
                   {['Spider-Man Oversized', 'Anime Hoodies', 'Wonder Woman Dress', 'Gryffindor Cap'].map(s => (
                     <button key={s} className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-xl group">
                        <Search size={14} className="text-gray-400" />
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400 group-hover:text-red-600">{s}</span>
                     </button>
                   ))}
                </div>
             </div>
           )}
        </div>

        <div className="flex items-center gap-4 lg:gap-8">
           <button className="hidden md:block p-2 text-gray-400 hover:text-red-600" onClick={() => navigate('/wishlist')}>
              <Heart size={24} />
           </button>
           <button className="p-2 hover:bg-red-50 dark:hover:bg-neutral-800 rounded-full relative" onClick={() => navigate('/account')}>
              <User size={24} />
           </button>
           <button className="relative p-3 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-600/20 hover:scale-105 transition-transform" onClick={() => navigate('/cart')}>
              <ShoppingBag size={24} />
              {state.cart.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">{state.cart.length}</span>}
           </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-black text-white py-20 px-6 lg:px-12 mt-20">
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
               <h2 className="text-3xl font-black italic mb-6">SOULSTORE<span className="text-red-600">.</span></h2>
               <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">India's most loved pop-culture merchandise brand. Wear your fandom on your sleeve.</p>
               <div className="flex gap-4">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"><Star size={20} /></div>
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"><Zap size={20} /></div>
               </div>
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest mb-8">Company</h4>
               <ul className="space-y-4 text-sm font-bold text-gray-500">
                  <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Our Stores</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
               </ul>
            </div>
            <div>
               <h4 className="text-xs font-black uppercase tracking-widest mb-8">Need Help?</h4>
               <ul className="space-y-4 text-sm font-bold text-gray-500">
                  <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Return Policy</li>
                  <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
               </ul>
            </div>
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
               <h4 className="text-xl font-black uppercase italic mb-4 tracking-tighter">The Newsletter</h4>
               <p className="text-xs font-medium text-gray-500 mb-6 uppercase tracking-widest">Get early access to secret drops.</p>
               <div className="flex gap-2">
                  <input type="email" placeholder="Email Address" className="flex-1 bg-white/10 border-none rounded-xl px-4 text-xs outline-none" />
                  <button className="bg-red-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase">Join</button>
               </div>
            </div>
         </div>
         <div className="container mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">© 2024 SoulStore Pro. All Rights Reserved.</p>
            <div className="flex gap-4 opacity-30">
               <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" />
            </div>
         </div>
      </footer>
    </div>
  );
};
