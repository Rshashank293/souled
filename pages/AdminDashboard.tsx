
import React from 'react';
// Fix: remove .tsx extension for standard module resolution
import { useApp } from '../store';
import { BarChart3, ShieldAlert, Truck, Users, AlertCircle, TrendingUp, Package, DollarSign, Warehouse, Globe, Zap } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { state } = useApp();
  const stats = [
    { label: 'Enterprise Rev', value: '₹14.2M', trend: '+18%', icon: DollarSign, color: 'text-green-600' },
    { label: 'Warehouse Load', value: '72%', trend: 'Optimum', icon: Warehouse, color: 'text-blue-600' },
    { label: 'Logistics SLA', value: '98.8%', trend: '+0.2%', icon: Truck, color: 'text-yellow-600' },
    { label: 'Risk Flags', value: '3', trend: 'Critical', icon: ShieldAlert, color: 'text-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-6 lg:p-12 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
         <div>
            <div className="flex items-center gap-3 mb-2">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
               <h1 className="text-4xl font-black uppercase tracking-tighter italic">Command <span className="text-red-600">Center</span></h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest">Enterprise Operations • Node Cluster ID: SS-MUM-01</p>
         </div>
         <div className="flex gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none bg-black dark:bg-white dark:text-black px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
               <Zap size={14} className="text-red-600" /> System Reboot
            </button>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
         {stats.map(stat => (
           <div key={stat.label} className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] shadow-xl border border-gray-100 dark:border-neutral-800 group hover:border-red-600 transition-colors">
              <div className={`w-14 h-14 bg-gray-50 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 ${stat.color} group-hover:scale-110 transition-transform`}>
                 <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-end gap-3">
                 <span className="text-3xl font-black tracking-tighter uppercase">{stat.value}</span>
                 <span className={`text-[10px] font-bold ${stat.trend === 'Critical' ? 'text-red-600' : 'text-green-600'}`}>{stat.trend}</span>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};