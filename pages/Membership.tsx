
import React from 'react';
import { useApp } from '../store';
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

      <section className="bg-white text-black py-32 rounded-[5rem] mx-4 overflow-hidden relative">
         <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mb-8">Compare The <br/> <span className="text-red-600">Difference.</span></h2>
               <div className="space-y-6">
                  {[
                    { label: 'Standard Price', fan: '₹1499', squad: '₹1199' },
                    { label: 'Shipping', fan: '₹49', squad: 'FREE' },
                    { label: 'Points Earned', fan: '1X', squad: '2X' },
                    { label: 'Return Period', fan: '15 Days', squad: '30 Days' },
                  ].map(row => (
                    <div key={row.label} className="flex items-center justify-between py-6 border-b border-gray-100">
                       <span className="font-black text-xs uppercase tracking-widest text-gray-400">{row.label}</span>
                       <div className="flex gap-12 text-center">
                          <div className="w-20"><p className="text-[10px] font-black uppercase text-gray-300">Fan</p><p className="font-bold">{row.fan}</p></div>
                          <div className="w-20"><p className="text-[10px] font-black uppercase text-red-600">Squad</p><p className="font-black text-red-600">{row.squad}</p></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-gray-50 rounded-[4rem] p-12 border border-gray-100 shadow-2xl">
               <h3 className="text-3xl font-black uppercase mb-8 italic">Squad Tier <span className="text-red-600">Pricing</span></h3>
               <div className="space-y-4">
                  <div className="bg-white p-8 rounded-3xl border-4 border-red-600 flex items-center justify-between">
                     <div>
                        <h4 className="font-black text-lg">ANNUAL PLAN</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">365 Days of Benefits</p>
                     </div>
                     <p className="text-3xl font-black">₹799</p>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 flex items-center justify-between opacity-50 grayscale">
                     <div>
                        <h4 className="font-black text-lg">MONTHLY PLAN</h4>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Coming Soon</p>
                     </div>
                     <p className="text-3xl font-black">₹199</p>
                  </div>
               </div>
               <button className="w-full bg-red-600 text-white py-6 rounded-2xl font-black text-lg mt-12 hover:bg-black shadow-xl transition-all">START MEMBERSHIP</button>
               <p className="text-center mt-6 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                 <CheckCircle2 size={12} className="text-green-600" /> Cancel anytime. No questions asked.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
};
