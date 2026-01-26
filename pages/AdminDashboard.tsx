
import React from 'react';
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
            <button className="flex-1 lg:flex-none bg-white dark:bg-neutral-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">Analytics Export</button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            {/* Sales Graph */}
            <div className="bg-white dark:bg-neutral-900 p-10 rounded-[3.5rem] shadow-xl border border-gray-100 dark:border-neutral-800">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter">Throughput <span className="text-red-600">Velocity</span></h3>
                  <div className="flex gap-2">
                     <span className="w-2 h-2 bg-red-600 rounded-full" />
                     <span className="w-2 h-2 bg-gray-200 rounded-full" />
                  </div>
               </div>
               <div className="h-72 flex items-end gap-3">
                  {[30, 55, 40, 80, 95, 60, 75, 50, 85, 90, 65, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-red-600/10 rounded-t-2xl hover:bg-red-600 transition-all relative group" style={{ height: `${h}%` }}>
                       <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1.5 rounded-xl text-[8px] font-black opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap shadow-xl">₹{h * 10}k</div>
                    </div>
                  ))}
               </div>
               <div className="flex justify-between mt-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
               </div>
            </div>

            {/* Inventory / Warehouse Logic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] border border-gray-100 dark:border-neutral-800 shadow-lg">
                  <h4 className="text-sm font-black uppercase tracking-widest mb-8 border-b border-gray-50 dark:border-neutral-800 pb-4">Warehouse Status</h4>
                  <div className="space-y-6">
                     {[
                       { loc: 'MUMBAI-WH-01', cap: '92%', status: 'Critical' },
                       { loc: 'DELHI-WH-02', cap: '64%', status: 'Optimal' },
                       { loc: 'BLR-WH-03', cap: '48%', status: 'Optimal' },
                     ].map(wh => (
                       <div key={wh.loc} className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-500">{wh.loc}</span>
                          <div className="flex-grow mx-6 h-1.5 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                             <div className={`h-full ${wh.status === 'Critical' ? 'bg-red-600' : 'bg-green-500'}`} style={{ width: wh.cap }} />
                          </div>
                          <span className="text-[10px] font-black">{wh.cap}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="bg-red-600 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                  <Globe className="absolute -right-10 -bottom-10 opacity-10" size={180} />
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4">Market Expansion</h4>
                  <p className="text-xs font-bold opacity-80 leading-relaxed mb-8">Ready to sync global inventories? US & UK clusters are pending approval.</p>
                  <button className="bg-white text-red-600 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform">Initialize Sync</button>
               </div>
            </div>
         </div>

         <div className="space-y-10">
            {/* Fraud / Alert Engine */}
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-[3.5rem] shadow-xl border-4 border-red-50 dark:border-red-900/20">
               <div className="flex items-center gap-3 mb-8">
                  <AlertCircle className="text-red-600" />
                  <h3 className="text-lg font-black uppercase italic tracking-tighter">Fraud <span className="text-red-600">Watch</span></h3>
               </div>
               <div className="space-y-4">
                  {[
                    { id: 'ORD-9981', risk: 'HIGH', type: 'IP Mismatch' },
                    { id: 'ORD-9975', risk: 'MED', type: 'Velocity Alert' },
                  ].map(alert => (
                    <div key={alert.id} className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl flex items-center justify-between">
                       <div>
                          <p className="text-xs font-black uppercase">{alert.id}</p>
                          <p className="text-[10px] text-gray-500 font-bold uppercase">{alert.type}</p>
                       </div>
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${alert.risk === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{alert.risk}</span>
                    </div>
                  ))}
               </div>
               <button className="w-full mt-8 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-colors">Audit All Orders</button>
            </div>

            {/* Customer Segments */}
            <div className="bg-black text-white p-10 rounded-[3.5rem] shadow-2xl relative">
               <Users className="absolute top-10 right-10 text-red-600 opacity-20" size={80} />
               <h3 className="text-xl font-black uppercase italic tracking-tighter mb-10">SLA <span className="text-red-600">Metrics</span></h3>
               <div className="space-y-8">
                  {[
                    { l: 'Processing Time', v: '4.2h', p: 90 },
                    { l: 'Delivery Success', v: '99.4%', p: 99 },
                    { l: 'RMA Handled', v: '2.1h', p: 85 },
                  ].map(m => (
                    <div key={m.l}>
                       <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                          <span>{m.l}</span>
                          <span className="text-red-600">{m.v}</span>
                       </div>
                       <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="bg-red-600 h-full" style={{ width: `${m.p}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
