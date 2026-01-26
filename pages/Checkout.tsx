
import React, { useState } from 'react';
import { useApp } from '../store';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Home, Briefcase, MapPin, CheckCircle2, Lock, Wallet, Smartphone } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [selectedAddressId, setSelectedAddressId] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState<'Prepaid' | 'COD' | 'Split'>('Prepaid');
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 999 ? 0 : 49;
  const gst = Math.round(subtotal * 0.12);
  const discount = state.user?.isMember ? Math.round(subtotal * 0.2) : 0;
  const total = subtotal + shipping + gst - discount;

  const handlePlaceOrder = () => {
    if (paymentMethod === 'COD' && !showOtp) {
      setShowOtp(true);
      return;
    }
    
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const newOrder = {
        id: orderId,
        userId: state.user?.id || 'guest',
        items: state.cart,
        subtotal,
        shipping,
        discount,
        gst,
        total,
        status: 'Processing',
        date: new Date().toLocaleDateString(),
        paymentMethod: paymentMethod as any,
        trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        fraudScore: 0.05,
        courierPartner: 'Delhivery Express'
      };
      
      dispatch({ type: 'PLACE_ORDER', payload: newOrder as any });
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-32 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600">
          <CheckCircle2 size={56} />
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter italic">Order Secured!</h1>
        <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">Your gear is in processing. Tracking link sent to WhatsApp & Email.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => navigate('/account')} className="bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl">My Dashboard</button>
          <button onClick={() => navigate('/')} className="bg-white border-2 border-gray-200 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all">Back to Store</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-neutral-950 min-h-screen py-12 lg:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-grow space-y-10">
            <div className="flex items-center gap-4 mb-10">
               {[{ n: 1, l: 'Address' }, { n: 2, l: 'Payment' }].map(s => (
                 <div key={s.n} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border-2 ${step >= s.n ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-300 border-gray-200'}`}>{s.n}</div>
                    <span className={`text-xs font-black uppercase tracking-widest ${step >= s.n ? 'text-black dark:text-white' : 'text-gray-300'}`}>{s.l}</span>
                 </div>
               ))}
            </div>

            {step === 1 && (
              <div className="animate-in slide-in-from-left duration-300">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Shipping <span className="text-red-600">Details</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {state.user?.addresses.map(addr => (
                    <div 
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all relative ${selectedAddressId === addr.id ? 'bg-white dark:bg-neutral-900 border-red-600 shadow-xl' : 'bg-gray-100 dark:bg-neutral-800 border-transparent hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`p-2 rounded-xl ${selectedAddressId === addr.id ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400'}`}>
                          {addr.type === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
                        </div>
                        <span className="font-black text-xs uppercase tracking-widest">{addr.type}</span>
                        {selectedAddressId === addr.id && <div className="ml-auto w-5 h-5 bg-red-600 rounded-full border-4 border-red-100" />}
                      </div>
                      <h4 className="font-black text-lg mb-1">{state.user?.name}</h4>
                      <p className="text-gray-500 text-sm font-medium leading-relaxed mb-4">{addr.street}, {addr.city}, {addr.pincode}</p>
                      <p className="text-xs font-black text-gray-900 dark:text-white">{addr.phone}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-12 w-full bg-red-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-red-700 shadow-2xl transition-all uppercase tracking-widest">Proceed to Payment</button>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-left duration-300">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-10">Payment <span className="text-red-600">Secure</span></h2>
                
                {state.user?.walletBalance! > 0 && (
                  <div className="bg-blue-600 text-white p-8 rounded-[2rem] mb-8 flex items-center justify-between shadow-xl">
                     <div className="flex items-center gap-4">
                        <Wallet size={32} />
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Wallet Balance</p>
                           <h4 className="text-2xl font-black">₹{state.user?.walletBalance}</h4>
                        </div>
                     </div>
                     <button onClick={() => setPaymentMethod('Split')} className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${paymentMethod === 'Split' ? 'bg-white text-blue-600 shadow-lg' : 'bg-white/20 hover:bg-white/30'}`}>Use Wallet</button>
                  </div>
                )}

                <div className="space-y-4">
                  {[
                    { id: 'Prepaid', title: 'Card / UPI / Netbanking', desc: 'Secure payment gateway by Razorpay', icon: <CreditCard /> },
                    { id: 'COD', title: 'Cash on Delivery', desc: 'Confirm via OTP at checkout', icon: <Smartphone /> }
                  ].map(mode => (
                    <div 
                      key={mode.id}
                      onClick={() => { setPaymentMethod(mode.id as any); setShowOtp(false); }}
                      className={`p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center gap-6 ${paymentMethod === mode.id ? 'bg-white dark:bg-neutral-900 border-red-600 shadow-xl' : 'bg-gray-100 dark:bg-neutral-800 border-transparent hover:border-gray-300'}`}
                    >
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${paymentMethod === mode.id ? 'bg-red-50 text-red-600' : 'bg-white text-gray-400'}`}>{mode.icon}</div>
                       <div className="flex-grow">
                          <h4 className="font-black text-lg">{mode.title}</h4>
                          <p className="text-gray-500 text-sm font-medium">{mode.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>

                {showOtp && (
                  <div className="mt-8 p-8 bg-yellow-50 rounded-[2rem] border-2 border-dashed border-yellow-400 animate-in slide-in-from-top duration-500">
                     <p className="text-xs font-black text-yellow-800 uppercase tracking-widest mb-4">Confirm COD via OTP</p>
                     <div className="flex gap-4">
                        <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="0000" className="bg-white border-2 border-yellow-200 rounded-xl px-4 py-3 w-32 text-center font-black tracking-[0.5em] focus:ring-2 focus:ring-yellow-400 outline-none" />
                        <button className="text-xs font-black text-yellow-800 underline">Resend OTP</button>
                     </div>
                  </div>
                )}

                <button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="mt-12 w-full bg-red-600 text-white py-6 rounded-2xl font-black text-lg hover:bg-red-700 shadow-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-4"
                >
                  {isProcessing ? 'PROCESSING...' : `PAY ₹${total}`}
                </button>
              </div>
            )}
          </div>

          <aside className="lg:w-96 flex-shrink-0">
             <div className="bg-white dark:bg-neutral-900 rounded-[2.5rem] p-10 shadow-2xl border border-gray-100 dark:border-neutral-800 sticky top-32">
                <h3 className="text-xl font-black uppercase mb-8 border-b border-gray-100 dark:border-neutral-800 pb-6 italic tracking-tighter">Order <span className="text-red-600">Summary</span></h3>
                <div className="space-y-4 mb-10 text-xs font-bold text-gray-500 uppercase tracking-widest">
                   <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900 dark:text-white">₹{subtotal}</span></div>
                   <div className="flex justify-between"><span>Shipping Fee</span><span className="text-green-600">FREE</span></div>
                   <div className="flex justify-between"><span>GST (12%)</span><span className="text-gray-900 dark:text-white">₹{gst}</span></div>
                   <div className="flex justify-between text-green-600"><span>Squad Points</span><span>-₹{discount}</span></div>
                   <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-dashed border-gray-100 dark:border-neutral-800">
                      <span className="text-lg font-black text-gray-900 dark:text-white">Total</span>
                      <span className="text-3xl font-black text-red-600">₹{total}</span>
                   </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-neutral-800 rounded-2xl flex items-center gap-3">
                   <ShieldCheck className="text-red-600" />
                   <p className="text-[10px] font-black uppercase leading-tight text-gray-500">Secured with 256-bit SSL encryption. Enterprise protection active.</p>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
