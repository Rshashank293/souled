
import React from 'react';
import { useApp } from '../store.tsx';
import { ProductCard } from '../components/ProductCard.tsx';
import { ChevronRight, Sparkles, TrendingUp, Users, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Oversized Tees', img: 'https://picsum.photos/seed/cat1/400/500' },
  { name: 'Classic Tees', img: 'https://picsum.photos/seed/cat2/400/500' },
  { name: 'Shirts', img: 'https://picsum.photos/seed/cat3/400/500' },
  { name: 'Joggers', img: 'https://picsum.photos/seed/cat4/400/500' },
  { name: 'Hoodies', img: 'https://picsum.photos/seed/cat5/400/500' },
  { name: 'Dresses', img: 'https://picsum.photos/seed/cat6/400/500' },
];

const THEMES = [
  { name: 'Marvel', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' },
  { name: 'DC', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg' },
  { name: 'Anime', logo: 'https://picsum.photos/seed/anime_logo/100/100' },
  { name: 'Disney', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_2011.svg' },
];

export const Home: React.FC = () => {
  const { state } = useApp();
  
  return (
    <div className="pb-32 lg:pb-0 animate-in fade-in duration-500">
      <div className="container mx-auto px-6 py-8 overflow-x-auto no-scrollbar flex gap-8">
         {state.stories.map(story => (
           <div key={story.id} className="flex flex-col items-center gap-3 flex-shrink-0 group cursor-pointer">
              <div className="w-20 h-20 rounded-full p-1 border-2 border-red-600 transition-transform group-active:scale-90">
                 <img src={story.imageUrl} className="w-full h-full object-cover rounded-full bg-gray-200 grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600">{story.title}</span>
           </div>
         ))}
      </div>

      <section className="relative h-[85vh] overflow-hidden bg-black group">
         <img src="https://picsum.photos/seed/hero_soul/1920/1080" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-10000" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 animate-in slide-in-from-top duration-700">
               Official Marvel Collection
            </div>
            <h1 className="text-6xl lg:text-[10rem] font-black italic tracking-tighter text-white mb-8 leading-none animate-in slide-in-from-bottom duration-700">
               CRASH THE <br/> <span className="text-red-600 underline decoration-8">SQUAD.</span>
            </h1>
            <p className="text-xl lg:text-3xl text-white/80 font-bold mb-12 max-w-3xl">Premium quality fabrics meets high-octane graphic designs.</p>
            <div className="flex flex-col sm:flex-row gap-6">
               <Link to="/products" className="bg-white text-black px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-red-600 hover:text-white transition-all">SHOP NOW</Link>
               <Link to="/membership" className="bg-transparent border-2 border-white text-white px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">JOIN SQUAD</Link>
            </div>
         </div>
      </section>

      <section className="container mx-auto px-6 lg:px-12 py-32">
         <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter italic">Top <span className="text-red-600">Categories</span></h2>
            <Link to="/products" className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2 hover:gap-4 transition-all">View All <ChevronRight size={16} /></Link>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map(cat => (
              <Link key={cat.name} to={`/products?category=${cat.name}`} className="group">
                 <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-xl border border-gray-100">
                    <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <p className="text-center text-[10px] font-black uppercase tracking-widest group-hover:text-red-600 transition-colors">{cat.name}</p>
              </Link>
            ))}
         </div>
      </section>

      <section className="bg-gray-50 dark:bg-neutral-800 py-24 rounded-[5rem] mx-4 mb-32">
         <div className="container mx-auto px-6 lg:px-12">
            <h2 className="text-center text-4xl font-black uppercase tracking-tighter italic mb-16">The Official <span className="text-red-600">Verse</span></h2>
            <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-60">
               {THEMES.map(theme => (
                 <img key={theme.name} src={theme.logo} className="h-12 lg:h-16 grayscale hover:grayscale-0 hover:scale-110 transition-all cursor-pointer" alt={theme.name} />
               ))}
            </div>
         </div>
      </section>

      <section className="container mx-auto px-6 lg:px-12 pb-32">
         <div className="flex items-end justify-between mb-16">
            <div>
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                 Trending <span className="text-red-600">Now</span>
                 <TrendingUp className="text-red-600" size={40} />
               </h2>
               <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-2">Bestsellers based on the last 24 hours</p>
            </div>
            <Link to="/products" className="text-xs font-black uppercase tracking-widest text-red-600 flex items-center gap-2">Explore All <ChevronRight size={16} /></Link>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {state.products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
         </div>
      </section>

      <section className="container mx-auto px-6 lg:px-12 pb-32">
         <div className="bg-black text-white rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <Star className="absolute top-10 right-10 text-red-600 opacity-20" size={180} />
            <div className="flex-1 relative z-10">
               <span className="flex items-center gap-2 text-red-600 font-black text-xs uppercase tracking-[0.4em] mb-6"><Zap size={16} /> Super Squad Exclusive</span>
               <h2 className="text-5xl lg:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">Save Flat <span className="text-red-600">20%</span> on Everything.</h2>
               <p className="text-xl font-bold text-gray-400 mb-12">Join 2 Million+ members and unlock free shipping & early drop access.</p>
               <Link to="/membership" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">JOIN THE SQUAD</Link>
            </div>
            <div className="flex-1 hidden lg:grid grid-cols-2 gap-6 relative z-10">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 p-4">
                    <img src={`https://picsum.photos/seed/squad_${i}/400/500`} className="w-full h-full object-cover rounded-2xl opacity-80" />
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
