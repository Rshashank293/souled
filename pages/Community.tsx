
import React from 'react';
import { useApp } from '../store';
// Fix: Added missing ShoppingBag import from lucide-react to resolve the reference on line 37
import { Users, Heart, MessageCircle, Share2, Sparkles, Plus, ShoppingBag } from 'lucide-react';

export const Community: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pb-24 lg:pb-0">
      <div className="bg-black text-white py-20 px-6 lg:px-12 text-center relative overflow-hidden">
         <Sparkles className="absolute top-10 right-10 text-red-600 opacity-20" size={120} />
         <h1 className="text-4xl lg:text-7xl font-black italic tracking-tighter uppercase mb-6">The Soul <span className="text-red-600">Squad.</span></h1>
         <p className="text-xl font-medium text-gray-400 max-w-2xl mx-auto mb-10">Show off your style, tag your gear, and join India's most vibrant fashion community.</p>
         <button className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-3 mx-auto">
           <Plus size={20} /> Upload Your Look
         </button>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-10">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {state.communityPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-neutral-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 dark:border-neutral-800 group">
                 <div className="p-6 flex items-center gap-4">
                    <img src={post.userImage} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                       <h4 className="font-black text-xs uppercase tracking-widest">@{post.userHandle}</h4>
                       <p className="text-[10px] text-gray-500 font-bold uppercase">SQUAD GOLD MEMBER</p>
                    </div>
                    <button className="ml-auto text-gray-400 hover:text-red-600"><Share2 size={18} /></button>
                 </div>
                 <div className="aspect-[4/5] overflow-hidden relative">
                    <img src={post.postImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-6 left-6 flex gap-2">
                       {post.taggedProducts.map(pid => (
                         <div key={pid} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">
                           <ShoppingBag size={12} /> SHOP ITEM
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="p-6">
                    <div className="flex items-center gap-6 mb-4">
                       <button className="flex items-center gap-2 text-xs font-black text-red-600"><Heart size={20} fill="currentColor" /> {post.likes}</button>
                       <button className="flex items-center gap-2 text-xs font-black text-gray-500"><MessageCircle size={20} /> 48</button>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">{post.description}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
