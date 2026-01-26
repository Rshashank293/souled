
import React, { useState } from 'react';
import { Sparkles, X, Gift, RotateCw } from 'lucide-react';
import { useApp } from '../store.tsx';

export const GamifiedOffers: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { dispatch } = useApp();

  const spinWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const prizes = ['FLAT200', 'BOGO', 'SQUAD50', 'FASHION10'];
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      setResult(win);
      setIsSpinning(false);
    }, 2000);
  };

  const handleApply = () => {
    if (result) {
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { text: `Coupon ${result} applied successfully! Check your rewards at checkout.`, type: 'success' } 
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 z-[90] bg-yellow-400 text-black p-4 rounded-full shadow-2xl animate-bounce hover:scale-110 transition-transform"
      >
        <Gift size={28} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden relative p-8 text-center animate-in zoom-in-95 duration-500">
            <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"><X size={20} /></button>
            
            <div className="mb-8">
               <Sparkles size={48} className="text-yellow-500 mx-auto mb-4" />
               <h2 className="text-3xl font-black italic tracking-tighter uppercase">Spin to Win!</h2>
               <p className="text-gray-500 text-sm font-medium mt-2">Get exclusive squad coupons by spinning the wheel of fashion.</p>
            </div>

            <div className={`relative w-48 h-48 mx-auto mb-10 transition-transform duration-[2000ms] ${isSpinning ? 'rotate-[1080deg]' : ''} ease-in-out`}>
               <div className="absolute inset-0 rounded-full border-8 border-yellow-400 bg-gradient-to-tr from-red-600 to-red-400 shadow-2xl flex items-center justify-center">
                  <RotateCw size={40} className="text-white opacity-20" />
               </div>
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-4 h-8 bg-black rounded-b-full z-10" />
            </div>

            {!result ? (
              <button 
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-red-200"
              >
                {isSpinning ? 'Spinning...' : 'Spin Now'}
              </button>
            ) : (
              <div className="animate-in zoom-in duration-500">
                <div className="bg-green-50 border-2 border-dashed border-green-400 p-6 rounded-3xl mb-6">
                   <p className="text-[10px] font-black text-green-600 uppercase mb-2">You Won!</p>
                   <h3 className="text-4xl font-black italic tracking-tight">{result}</h3>
                </div>
                <button 
                  onClick={handleApply}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl"
                >
                  Apply Reward
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
