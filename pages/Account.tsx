
import React, { useState } from 'react';
import { useApp } from '../store';
import { 
  Wallet, Package, Heart, Star, Settings, ChevronRight, LogOut, 
  Clock, RotateCcw, ShieldCheck, Truck, User, MapPin, Ticket, 
  CreditCard, Bell, Edit3, Trash2, Plus, Minus, CheckCircle2, 
  Lock, ArrowRight, Eye, EyeOff, LayoutDashboard, ExternalLink, Download, 
  ShoppingBag, Gift, Smartphone, Search, Home, Briefcase, Copy, Share2, Calendar,
  CreditCard as PaymentIcon, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

export const Account: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: '9876543210',
    gender: 'Male',
    dob: '1995-08-24'
  });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = {
      id: 'u_7782',
      name: authMode === 'login' ? 'Souled Member' : 'New Fan',
      email: 'squad_fan@souledstore.pro',
      isMember: true,
      tier: 'GOLD',
      points: 850,
      walletBalance: 420,
      referralCode: 'SQUAD88',
      role: 'USER',
      addresses: [
        { id: '1', type: 'Home', street: 'B-402, Skyline Residency, HSR Layout', city: 'Bangalore', state: 'Karnataka', pincode: '560102', phone: '9876543210', isDefault: true },
        { id: '2', type: 'Work', street: 'WeWork Galaxy, MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', phone: '9876543210' }
      ]
    };
    dispatch({ type: 'SET_USER', payload: mockUser as any });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { text: `Welcome back to the Squad!`, type: 'success' } });
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  const copyReferral = () => {
    if (state.user?.referralCode) {
      navigator.clipboard.writeText(state.user.referralCode);
      dispatch({ type: 'ADD_NOTIFICATION', payload: { text: 'Referral code copied to clipboard!', type: 'success' } });
    }
  };

  // --- Sub-View Renderers ---

  const ProfileHeader = () => (
    <div className="relative mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Decorative Canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-indigo-600/5 rounded-[3rem] blur-3xl -z-10" />
      
      <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-gray-200/50 dark:shadow-none flex flex-col md:flex-row items-center gap-10">
        <div className="relative">
          <div className="w-28 h-28 lg:w-36 lg:h-36 bg-gradient-to-tr from-red-600 to-red-400 rounded-full flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-red-200 uppercase ring-8 ring-white dark:ring-neutral-800">
            {state.user?.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg" />
        </div>

        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
            <h2 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tighter leading-none">{state.user?.name}</h2>
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
              <Star size={12} fill="currentColor" /> {state.user?.tier} SQUAD
            </div>
          </div>
          <p className="text-gray-400 font-bold text-sm tracking-widest mb-6 flex items-center justify-center md:justify-start gap-2 uppercase">
             {state.user?.email} • Member since Oct 2023
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => setActiveSection('settings')}
              className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-xl"
            >
              Edit Profile
            </button>
            <div className="bg-gray-100 dark:bg-neutral-800 px-6 py-3 rounded-2xl flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase">Referral:</span>
              <span className="text-xs font-black text-black dark:text-white uppercase">{state.user?.referralCode}</span>
              <button onClick={copyReferral} className="text-red-600 hover:scale-110 transition-transform"><Copy size={14} /></button>
            </div>
          </div>
        </div>

        <div className="hidden xl:flex gap-10 border-l border-gray-100 dark:border-neutral-800 pl-10">
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Soul Wallet</p>
            <p className="text-3xl font-black italic">₹{state.user?.walletBalance}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Squad Points</p>
            <p className="text-3xl font-black italic">{state.user?.points}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardHome = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Recent Orders Overview */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-neutral-800 group overflow-hidden relative">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-black uppercase italic tracking-tighter">My <span className="text-red-600">Orders</span></h3>
            <button onClick={() => setActiveSection('orders')} className="bg-gray-50 dark:bg-neutral-800 p-2 rounded-xl group-hover:text-red-600 transition-colors"><ChevronRight size={20} /></button>
          </div>
          <div className="space-y-4 relative z-10">
            {state.orders.length > 0 ? state.orders.slice(0, 1).map(order => (
              <div key={order.id} className="bg-gray-50 dark:bg-neutral-800 rounded-2xl p-4 flex gap-4">
                <div className="w-16 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                  <img src={order.items[0].images[0]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">{order.status}</p>
                  <p className="text-sm font-bold truncate">{order.items[0].name}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase">Order #{order.id}</p>
                </div>
              </div>
            )) : <p className="text-sm text-gray-500 text-center py-4 italic">No recent activity.</p>}
          </div>
          <ShoppingBag className="absolute -bottom-4 -right-4 opacity-[0.03] rotate-12" size={120} />
        </div>

        {/* Viral Growth Card */}
        <div className="bg-black text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[60px] opacity-20 group-hover:scale-150 transition-transform duration-1000" />
          <div className="relative z-10">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">Invite <span className="text-red-600">Squad</span></h3>
            <p className="text-xs font-medium text-gray-400 mb-8 leading-relaxed">Give ₹250, Get ₹250. Invite your friends to shop legendarily!</p>
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-2xl">
              <span className="flex-grow font-black tracking-widest text-sm uppercase">{state.user?.referralCode}</span>
              <button onClick={copyReferral} className="bg-red-600 p-2 rounded-xl hover:bg-red-700 transition-colors"><Copy size={16} /></button>
            </div>
          </div>
          <Share2 className="absolute -bottom-4 -right-4 opacity-5" size={120} />
        </div>

        {/* Membership Status Card */}
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] shadow-sm border border-gray-100 dark:border-neutral-800 group relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Super <span className="text-red-600">Squad</span></h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600"><Star size={32} fill="currentColor" /></div>
              <div>
                <p className="text-2xl font-black italic leading-none">{state.user?.points}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Reward Points</p>
              </div>
            </div>
            <button onClick={() => setActiveSection('membership')} className="w-full bg-gray-50 dark:bg-neutral-800 text-black dark:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">My Perks</button>
          </div>
          <Star className="absolute -bottom-8 -right-8 opacity-[0.02] rotate-12" size={180} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Wishlist', icon: Heart, val: state.wishlist.length, section: 'wishlist' },
          { label: 'Addresses', icon: MapPin, val: state.user?.addresses.length, section: 'addresses' },
          { label: 'Coupons', icon: Ticket, val: 4, section: 'coupons' },
          { label: 'Returns', icon: RotateCcw, val: 0, section: 'orders' }
        ].map(({ icon: Icon, ...item }) => (
          <button 
            key={item.label} 
            onClick={() => setActiveSection(item.section)}
            className="bg-white dark:bg-neutral-900 p-6 rounded-[2rem] border border-gray-100 dark:border-neutral-800 text-center hover:shadow-xl transition-all group"
          >
            <div className="text-gray-400 group-hover:text-red-600 transition-colors mb-4 flex justify-center">
              <Icon size={24} />
            </div>
            <p className="text-xl font-black mb-1">{item.val}</p>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const EditProfileForm = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-12">Account <span className="text-red-600">Settings</span></h2>
      <div className="bg-white dark:bg-neutral-900 p-10 lg:p-12 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-neutral-800">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'ADD_NOTIFICATION', payload: { text: 'Identity updated successfully!', type: 'success' } });
        }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
            <input 
              type="text" 
              value={profileData.name}
              onChange={e => setProfileData({...profileData, name: e.target.value})}
              className="w-full bg-gray-50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Email Identity</label>
            <input 
              type="email" 
              value={profileData.email}
              onChange={e => setProfileData({...profileData, email: e.target.value})}
              className="w-full bg-gray-50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Mobile Number</label>
            <div className="flex gap-2">
              <span className="bg-gray-100 dark:bg-neutral-800 px-4 py-4 rounded-2xl font-black text-sm flex items-center">+91</span>
              <input 
                type="tel" 
                value={profileData.phone}
                className="flex-grow bg-gray-50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Date of Birth</label>
            <div className="relative">
              <input 
                type="date" 
                value={profileData.dob}
                onChange={e => setProfileData({...profileData, dob: e.target.value})}
                className="w-full bg-gray-50 dark:bg-neutral-800 border-none rounded-2xl px-6 py-4 font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all" 
              />
              <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 pt-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Gender Selection</label>
            <div className="flex gap-4">
              {['Male', 'Female', 'Other'].map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setProfileData({...profileData, gender: g})}
                  className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${profileData.gender === g ? 'bg-black text-white border-black shadow-xl' : 'bg-transparent border-gray-100 dark:border-neutral-800 text-gray-400'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 pt-8 flex gap-4">
            <button type="submit" className="flex-grow bg-red-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-red-700 transition-all">Save Profile Changes</button>
            <button type="button" onClick={() => setActiveSection('dashboard')} className="px-10 py-5 rounded-2xl font-black text-xs uppercase text-gray-400 border-2 border-gray-100 dark:border-neutral-800">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  const OrderHistory = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Order <span className="text-red-600">History</span></h2>
      {state.orders.length > 0 ? state.orders.map(order => (
        <div key={order.id} className="bg-white dark:bg-neutral-900 rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-800 hover:shadow-2xl transition-all group">
          <div className="bg-gray-50/50 dark:bg-neutral-800/50 p-8 border-b border-gray-100 dark:border-neutral-800 flex flex-wrap justify-between items-center gap-6">
            <div className="flex flex-wrap items-center gap-10">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">PLACED ON</p>
                <p className="text-sm font-black">{order.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TOTAL AMOUNT</p>
                <p className="text-sm font-black text-red-600">₹{order.total}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TRACKING ID</p>
                <p className="text-sm font-black flex items-center gap-1 uppercase">{order.trackingNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ORDER REFERENCE</p>
              <p className="text-sm font-black uppercase">{order.id}</p>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex -space-x-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="w-24 h-32 bg-gray-100 dark:bg-neutral-800 rounded-2xl border-4 border-white dark:border-neutral-900 shadow-xl overflow-hidden relative group-hover:-translate-y-2 transition-transform duration-500" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <img src={item.images[0]} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex-grow">
                <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.1em] mb-4 border border-green-100 dark:border-green-800">
                  <CheckCircle2 size={14} /> {order.status}
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-3">
                  {order.items[0].name} {order.items.length > 1 && `& ${order.items.length - 1} others`}
                </h4>
                <div className="flex gap-6 mb-8">
                  <button onClick={() => navigate(`/track/${order.id}`)} className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-red-600 transition-all flex items-center gap-2">
                    <Truck size={14} /> Track Parcel
                  </button>
                  <button className="bg-white dark:bg-neutral-900 border-2 border-gray-100 dark:border-neutral-800 text-gray-800 dark:text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all">Buy It Again</button>
                </div>
                <div className="flex gap-4">
                  <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1.5"><ExternalLink size={12} /> Order Details</button>
                  <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-1.5"><Download size={12} /> E-Invoice</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="bg-white dark:bg-neutral-900 p-20 rounded-[4rem] text-center shadow-sm border border-gray-100 dark:border-neutral-800">
          <Package size={80} className="mx-auto text-gray-100 dark:text-neutral-800 mb-6" />
          <h3 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">Your vault is empty!</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-10">Start your journey into the multiverse by adding some gear.</p>
          <button onClick={() => navigate('/products')} className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-red-600 transition-all">Browse Store</button>
        </div>
      )}
    </div>
  );

  const WalletLedger = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-12">Wallet & <span className="text-red-600">Points</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
          <div className="relative z-10">
            <PaymentIcon className="opacity-40 mb-10" size={64} />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-4">Soul Wallet Currency</p>
            <h2 className="text-7xl font-black italic tracking-tighter mb-12">₹{state.user?.walletBalance}</h2>
            <div className="flex gap-4">
              <button className="bg-white text-indigo-900 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">Add Balance</button>
              <button className="bg-white/10 border border-white/20 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Withdraw</button>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000" />
          <div className="relative z-10">
            <Star className="opacity-40 mb-10" size={64} fill="currentColor" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-4">Squad Reward Points</p>
            <h2 className="text-7xl font-black italic tracking-tighter mb-12">{state.user?.points}</h2>
            <button className="bg-white text-amber-600 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">Redeem Gear</button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 p-12 rounded-[3.5rem] shadow-sm border border-gray-100 dark:border-neutral-800">
        <h3 className="text-xl font-black uppercase italic mb-10">Passbook <span className="text-red-600">Ledger</span></h3>
        <div className="space-y-8">
          {[
            { id: 'TX-99', msg: 'Cashback: Miles Morales Tee', amt: '+₹250', date: 'Yesterday', status: 'Credit' },
            { id: 'TX-98', msg: 'Order Payment: #ORD-7721', amt: '-₹999', date: 'Oct 14, 2024', status: 'Debit' },
            { id: 'TX-97', msg: 'Referral Bonus: Marcus D.', amt: '+₹500', date: 'Oct 12, 2024', status: 'Credit' },
          ].map(tx => (
            <div key={tx.id} className="flex items-center justify-between pb-8 border-b border-gray-50 dark:border-neutral-800 last:border-0 last:pb-0">
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tx.status === 'Credit' ? 'bg-green-50 dark:bg-green-900/10 text-green-600' : 'bg-red-50 dark:bg-red-900/10 text-red-600'}`}>
                  {tx.status === 'Credit' ? <Plus size={24} /> : <Minus size={24} />}
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">{tx.msg}</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{tx.date} • ID: {tx.id}</p>
                </div>
              </div>
              <p className={`text-2xl font-black italic ${tx.status === 'Credit' ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>{tx.amt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SavedAddresses = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">Shipping <span className="text-red-600">Addresses</span></h2>
        <button className="bg-black text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all flex items-center gap-2">
          <Plus size={16} /> Add New Hub
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {state.user?.addresses.map(addr => (
          <div key={addr.id} className="bg-white dark:bg-neutral-900 p-8 rounded-[3rem] border-2 border-transparent hover:border-red-600 transition-all shadow-sm relative group overflow-hidden">
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-4 bg-gray-50 dark:bg-neutral-800 text-gray-400 rounded-2xl group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                {addr.type === 'Home' ? <Home size={24} /> : <Briefcase size={24} />}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{addr.type} Hub</span>
                <h4 className="text-lg font-black">{state.user?.name}</h4>
              </div>
              {addr.isDefault && (
                <span className="ml-auto bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-green-200 shadow-sm">
                  Primary Hub
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 leading-relaxed mb-8 pr-12 relative z-10">
              {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            <div className="flex items-center gap-6 pt-8 border-t border-gray-100 dark:border-neutral-800 relative z-10">
              <button className="text-[10px] font-black uppercase text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2"><Edit3 size={14} /> Edit Hub</button>
              <button className="text-[10px] font-black uppercase text-gray-400 hover:text-red-600 flex items-center gap-2"><Trash2 size={14} /> Remove</button>
              {!addr.isDefault && (
                <button className="ml-auto text-[10px] font-black uppercase text-blue-600 hover:underline">Set as Default</button>
              )}
            </div>
            <MapPin className="absolute -top-4 -right-4 opacity-[0.03] rotate-12" size={160} />
          </div>
        ))}
      </div>
    </div>
  );

  // --- LOGGED OUT VIEW ---
  if (!state.user) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-red-600 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px] opacity-40" />
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-neutral-900 rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5 relative z-10 animate-in zoom-in-95 duration-500">
          <div className="hidden lg:flex flex-col justify-between p-16 lg:p-24 bg-gradient-to-br from-red-600 to-red-800 text-white">
            <h2 className="text-3xl font-black italic tracking-tighter">SOULSTORE.</h2>
            <div>
              <h1 className="text-5xl lg:text-7xl font-black uppercase italic leading-none mb-8 tracking-tighter">JOIN THE <br/><span className="underline decoration-8 decoration-white/20">SQUAD.</span></h1>
              <p className="text-white/70 font-medium text-lg leading-relaxed max-w-sm">Unlock secret drops, member pricing, and free shipping on all orders.</p>
            </div>
            <div className="flex items-center gap-6">
              <ShieldCheck size={24} className="opacity-40" />
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Secured Login Interface</p>
            </div>
          </div>

          <div className="p-10 lg:p-24 bg-neutral-900 flex flex-col justify-center">
            <div className="flex gap-10 mb-12">
              <button onClick={() => setAuthMode('login')} className={`text-sm font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${authMode === 'login' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Login</button>
              <button onClick={() => setAuthMode('register')} className={`text-sm font-black uppercase tracking-[0.2em] pb-2 border-b-2 transition-all ${authMode === 'register' ? 'text-red-600 border-red-600' : 'text-gray-500 border-transparent'}`}>Register</button>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="Fan Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold placeholder:text-gray-700" required />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email or Phone</label>
                <input type="text" placeholder="fan@soulstore.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold placeholder:text-gray-700" required />
              </div>
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secret Password</label>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-red-600 transition-all font-bold placeholder:text-gray-700" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute bottom-4 right-6 text-gray-600 hover:text-white transition-colors">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-3">
                {authMode === 'login' ? 'Proceed to Vault' : 'Create My Account'} <ArrowRight size={18} />
              </button>
            </form>
            
            <div className="mt-12 text-center">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Or continue with</p>
               <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-white/10 transition-all">Google</button>
                  <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase hover:bg-white/10 transition-all">Apple</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LOGGED IN MAIN VIEW ---
  const SidebarItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: 'The Vault', icon: Heart },
    { id: 'addresses', label: 'My Hubs', icon: MapPin },
    { id: 'wallet', label: 'Wallet & Ledger', icon: Wallet },
    { id: 'membership', label: 'Super Squad', icon: Star },
    { id: 'coupons', label: 'My Coupons', icon: Ticket },
    { id: 'settings', label: 'Account Identity', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-12 lg:py-20">
      <div className="container mx-auto px-4 lg:px-12">
        <ProfileHeader />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Nav */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white dark:bg-neutral-900 rounded-[3rem] shadow-sm border border-gray-100 dark:border-neutral-800 p-6 space-y-2 sticky top-32">
              {SidebarItems.map(({ icon: Icon, ...item }) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all group ${activeSection === item.id ? 'bg-black text-white shadow-2xl translate-x-2' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white'}`}
                >
                  <div className={activeSection === item.id ? 'text-red-600' : 'group-hover:text-red-600 transition-colors'}>
                    <Icon size={20} />
                  </div>
                  {item.label}
                  {activeSection === item.id && <ChevronRight size={16} className="ml-auto text-red-600" />}
                </button>
              ))}
              <div className="pt-6 mt-6 border-t border-gray-100 dark:border-neutral-800">
                <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-red-600 bg-red-50 dark:bg-red-900/10 hover:bg-red-600 hover:text-white transition-all">
                  <LogOut size={20} /> Sign Out
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content View */}
          <main className="flex-grow min-h-[600px]">
            {activeSection === 'dashboard' && <DashboardHome />}
            {activeSection === 'orders' && <OrderHistory />}
            {activeSection === 'wishlist' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-12">The <span className="text-red-600">Vault</span></h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  {state.products.filter(p => state.wishlist.includes(p.id)).map(p => <ProductCard key={p.id} product={p} />)}
                  {state.wishlist.length === 0 && (
                    <div className="col-span-full py-24 text-center">
                      <Heart size={80} className="mx-auto text-gray-100 dark:text-neutral-800 mb-8" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-xl">Vault Empty.</p>
                      <button onClick={() => navigate('/products')} className="mt-8 bg-black text-white px-10 py-5 rounded-2xl font-black text-xs uppercase">Add Gear Now</button>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeSection === 'addresses' && <SavedAddresses />}
            {activeSection === 'wallet' && <WalletLedger />}
            {activeSection === 'settings' && <EditProfileForm />}
            {activeSection === 'membership' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-black text-white p-16 lg:p-24 rounded-[4rem] shadow-2xl relative overflow-hidden group">
                  <Star className="absolute top-10 right-10 text-red-600 opacity-20 group-hover:rotate-12 transition-transform duration-1000" size={300} />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-3 bg-red-600 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12">
                      <ShieldCheck size={20} /> {state.user?.tier} SQUAD MEMBER
                    </div>
                    <h2 className="text-6xl lg:text-9xl font-black italic tracking-tighter uppercase mb-8 leading-none">SQUAD <br/><span className="text-red-600">ACCESS.</span></h2>
                    <p className="text-xl font-medium text-gray-400 max-w-xl mb-16 leading-relaxed">Join 2 Million+ members and unlock flat 20% off on every single item, plus free express shipping for life.</p>
                    <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl">RENEW MEMBERSHIP</button>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'coupons' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-12">My <span className="text-red-600">Coupons</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {['SQUAD500', 'SUPER20', 'WELCOME250', 'FESTIVE10'].map(code => (
                    <div key={code} className="bg-white dark:bg-neutral-900 p-2 border-2 border-dashed border-gray-200 dark:border-neutral-800 rounded-[3rem] relative overflow-hidden group hover:border-red-400 transition-all">
                      <div className="p-10 rounded-[2.5rem] bg-gray-50 dark:bg-neutral-800/50 text-center">
                         <Ticket className="text-red-600 mx-auto mb-6" size={48} />
                         <h3 className="text-4xl font-black tracking-tighter mb-2 italic">{code}</h3>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Valid on orders above ₹2,499</p>
                         <div className="mt-8 flex gap-3">
                           <button className="flex-grow bg-black text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Copy Code</button>
                         </div>
                      </div>
                      <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 dark:bg-neutral-950 rounded-full" />
                      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-50 dark:bg-neutral-950 rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// --- Minimalist Alias ---
const InfoIcon = ({ className, size }: { className?: string, size?: number }) => <Star className={className} size={size} />;
