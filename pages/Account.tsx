
import React, { useState } from 'react';
import { useApp } from '../store.tsx';
import { Wallet, Package, Heart, Star, Settings, ChevronRight, LogOut, Clock, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const stats = [
    { label: 'Wallet Balance', value: `₹${state.user?.walletBalance}`, icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Squad Points', value: state.user?.points, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { label: 'My Orders', value: state.orders.length, icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-black text-white py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-8">
           <div className="w-24 h-24 lg:w-32 lg:h-32 bg-red-600 rounded-full flex items-center justify-center text-4xl lg:text-5xl font-black shadow-2xl">AM</div>
           <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter italic mb-2">{state.user?.name}</h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 items-center">
                 <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{state.user?.email}</span>
                 <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                   <Star size={12} fill="currentColor" /> {state.user?.tier} SQUAD MEMBER
                 </span>
              </div>
           </div>
           <button className="lg:ml-auto bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-all">
             <Settings size={24} />
           </button>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {stats.map(stat => (
             <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center gap-6">
                <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                   <stat.icon size={28} />
                </div>
                <div>
                   <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.label}</h4>
                   <p className="text-2xl font-black uppercase tracking-tighter mt-1">{stat.value}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="mt-12 grid lg:grid-cols-4 gap-12">
           <div className="lg:col-span-1 space-y-3">
              {[
                { id: 'orders', label: 'My Orders', icon: Package },
                { id: 'wallet', label: 'Wallet & Points', icon: Wallet },
                { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw },
                { id: 'wishlist', label: 'Wishlist', icon: Heart },
                { id: 'support', label: 'Help & Support', icon: ShieldCheck },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-black text-white shadow-xl translate-x-2' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                >
                   <tab.icon size={20} /> {tab.label}
                   <ChevronRight size={16} className="ml-auto" />
                </button>
              ))}
              <button className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-red-600 bg-red-50 mt-12">
                 <LogOut size={20} /> Logout
              </button>
           </div>

           <div className="lg:col-span-3 space-y-6">
              {activeTab === 'orders' && (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                   <h2 className="text-2xl font-black uppercase mb-8 italic">Order <span className="text-red-600">History</span></h2>
                   <div className="space-y-6">
                      {state.orders.length > 0 ? state.orders.map(order => (
                        <div key={order.id} className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-100">
                           <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                              <div>
                                 <p className="text-[10px] font-black text-gray-400 uppercase">Order ID</p>
                                 <p className="text-sm font-black">{order.id}</p>
                              </div>
                              <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                 {order.status}
                              </div>
                              <button 
                                onClick={() => navigate(`/track/${order.id}`)}
                                className="bg-black text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                              >
                                <Truck size={14} /> Track Order
                              </button>
                           </div>
                           <div className="flex gap-4 items-center">
                              {order.items.slice(0, 3).map(item => (
                                <img key={item.id} src={item.images[0]} className="w-16 h-20 object-cover rounded-xl" />
                              ))}
                              {order.items.length > 3 && <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-black">+{order.items.length - 3}</div>}
                              <div className="ml-auto text-right">
                                 <p className="text-[10px] font-black text-gray-400 uppercase">Total Amount</p>
                                 <p className="text-2xl font-black text-red-600">₹{order.total}</p>
                              </div>
                           </div>
                        </div>
                      )) : (
                        <div className="bg-white p-20 rounded-[3rem] text-center shadow-lg">
                           <Package size={60} className="mx-auto text-gray-200 mb-6" />
                           <h3 className="text-xl font-black uppercase mb-2">No orders found</h3>
                           <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                        </div>
                      )}
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
