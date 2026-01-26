
import React from 'react';
import { useApp } from '../store.tsx';
import { Zap, ShieldCheck, Truck, Star, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Membership: React.FC = () => {
  const { state } = useApp();

  const benefits = [
    { title: 'Flat 20% Discount', desc: 'On all products, even new drops', icon: Zap },
    { title: 'Free Express Delivery', desc: 'No minimum order required ever', icon: Truck },
    { title: 'Early Access', desc: 'Shop secret drops 24h before others', icon: Sparkles },
    { title: 'Birthday Rewards', desc: 'Special gifts on your big day', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
           <img src="https://picsum.photos/seed/squad/1920/1080" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 animate-in slide-in-from-bottom duration-1000">
           <div className="inline-flex items-center gap-3 bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8">
             <ShieldCheck size={18} /> Official Super Squad
           </div>
           <h1 className="text-6xl lg:text-9xl font-black italic tracking-tighter uppercase mb-8 leading-none">
             MORE THAN A <br/> <span className="text-red-600 underline decoration-8">FAN.</span>
           </h1>
           <p className="text-xl font-medium text-gray-400 max-w-2xl mx-auto mb-12">
             Unlock exclusive pricing, free shipping, and early access to the hottest drops in India.
           </p>
           <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:bg-red-600 hover:text-white transition-all shadow-2xl">JOIN NOW • ₹799/yr</button>
        </div>
      </section>
      <section className="container mx-auto px-6 lg:px-12 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {benefits.map(b => (
             <div key={b.title} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                   <b.icon size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{b.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{b.desc}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};
