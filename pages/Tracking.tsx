
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../store';
import { CheckCircle2, Package, Truck, MapPin, ChevronLeft, Phone, Info } from 'lucide-react';

export const Tracking: React.FC = () => {
  const { id } = useParams();
  const { state } = useApp();
  const order = state.orders.find(o => o.id === id) || state.orders[0];

  if (!order) return <div className="p-20 text-center uppercase font-black">Order not found</div>;

  const steps = [
    { label: 'Order Confirmed', time: 'Mon, 12 Oct', icon: CheckCircle2, completed: true },
    { label: 'Shipped via Shiprocket', time: 'Tue, 13 Oct', icon: Package, completed: true },
    { label: 'Out for Delivery', time: 'Wed, 14 Oct', icon: Truck, completed: true },
    { label: 'Delivered', time: 'Pending', icon: MapPin, completed: false },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-black text-white p-6 sticky top-0 z-50 flex items-center gap-4">
        <Link to="/account"><ChevronLeft size={24} /></Link>
        <div>
          <h1 className="text-lg font-black uppercase tracking-tight">Track Order</h1>
          <p className="text-[10px] font-bold text-gray-400">ID: {order.id}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 mb-8 flex items-center justify-between">
           <div>
              <p className="text-[10px] font-black text-red-600 uppercase mb-1">Expected Delivery</p>
              <p className="text-2xl font-black italic">TODAY BY 9 PM</p>
           </div>
           <div className="bg-red-600 text-white p-3 rounded-2xl animate-pulse">
             <Truck size={24} />
           </div>
        </div>

        <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
           {steps.map((step, i) => (
             <div key={step.label} className="flex gap-6 relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all ${step.completed ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                   <step.icon size={18} />
                </div>
                <div className="flex-grow pt-1">
                   <h3 className={`text-sm font-black uppercase ${step.completed ? 'text-black' : 'text-gray-400'}`}>{step.label}</h3>
                   <p className="text-xs font-bold text-gray-500 mt-1">{step.time}</p>
                   {step.completed && i === 2 && (
                     <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 animate-in slide-in-from-left duration-500">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white"><Phone size={16} /></div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase">Delivery Hero</p>
                           <p className="text-xs font-black">Rahul Singh (+91 99887 76655)</p>
                        </div>
                     </div>
                   )}
                </div>
             </div>
           ))}
        </div>

        <div className="mt-12 space-y-4">
           <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-4">
              <Info className="text-gray-400 flex-shrink-0" size={20} />
              <p className="text-xs font-medium text-gray-500 leading-relaxed">Your order is being delivered via <span className="font-black text-black">Delhivery Express</span>. Tracking number: {order.trackingNumber}</p>
           </div>
           <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Contact Support</button>
        </div>
      </div>
    </div>
  );
};
