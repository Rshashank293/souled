
import React from 'react';
import { useApp } from '../store';
import { ProductCard } from '../components/ProductCard';
import { ChevronRight, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { state } = useApp();
  
  return (
    <div className="pb-32 lg:pb-0 animate-in fade-in duration-500">
      {/* Story Bar */}
      <div className="container mx-auto px-6 py-8 overflow-x-auto no-scrollbar flex gap-6">
         {state.stories.map(story => (
           <div key={story.id} className="flex flex-col items-center gap-2 flex-shrink-0 group cursor-pointer">
              <div className="w-20 h-20 rounded-full p-1 border-2 border-red-600 transition-transform group-active:scale-90">
                 <img src={story.imageUrl} className="w-full h-full object-cover rounded-full bg-gray-200" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">{story.title}</span>
           </div>
         ))}
      </div>

      {/* Main Hero Slider (Visual only for demo) */}
      <section className="relative h-[600px] lg:h-[800px] overflow-hidden">
         <img src="https://picsum.photos/seed/enterprise_hero/1920/1080" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
         <div className="absolute bottom-20 left-6 lg:left-24 text-white max-w-3xl">
            <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">SS ORIGINALS</span>
            <h1 className="text-6xl lg:text-9xl font-black italic tracking-tighter mb-8 leading-none">THE PURE <br/> <span className="text-red-600 underline decoration-8">SQUAD.</span></h1>
            <p className="text-xl font-bold opacity-80 mb-12">New limited drops every Friday. Handcrafted in India. Global Standards.</p>
            <div className="flex gap-4">
               <Link to="/products" className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-red-600 hover:text-white transition-all">Explore Drop</Link>
               <button className="bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-white/20 hover:bg-white/20 transition-all">Watch Film</button>
            </div>
         </div>
      </section>

      {/* AI Trending Section */}
      <section className="container mx-auto px-6 lg:px-12 py-24">
         <div className="flex items-end justify-between mb-16">
            <div>
               <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter italic flex items-center gap-4">
                 Trending in <span className="text-red-600">{state.location.city}</span>
                 <TrendingUp className="text-red-600" size={40} />
               </h2>
               <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-2">Based on real-time sales data from your area</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600 hover:gap-4 transition-all">View Analytics <ChevronRight size={16} /></button>
         </div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {state.products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} />)}
         </div>
      </section>

      {/* Community Feed */}
      <section className="bg-black text-white py-24 rounded-[4rem] mx-4 my-24 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <img src="https://picsum.photos/seed/texture/1920/1080" className="w-full h-full object-cover" />
         </div>
         <div className="container mx-auto px-12 relative z-10">
            <div className="flex flex-col items-center text-center mb-20">
               <Users className="text-red-600 mb-6" size={56} />
               <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mb-6">Join The <span className="text-red-600">Circle.</span></h2>
               <p className="text-gray-400 font-medium text-lg max-w-xl">Upload your look, tag your gear, and earn 500 Squad Points if featured.</p>
               <button className="mt-10 bg-white text-black px-12 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Upload Look</button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="aspect-[4/5] bg-neutral-900 rounded-3xl overflow-hidden group cursor-pointer">
                    <img src={`https://picsum.photos/seed/community${i}/400/500`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                       <p className="text-[10px] font-black uppercase tracking-widest">@user_handle_{i}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
