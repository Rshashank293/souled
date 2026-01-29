
import React from 'react';
// Fix: remove .tsx extension for standard module resolution
import { useApp } from '../store';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const Cart: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = 0;
  const shipping = subtotal > 999 ? 0 : 49;
  const total = subtotal + shipping - discount;

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Let's find something you'll love!</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-red-600 text-white px-10 py-4 rounded-full font-black tracking-widest hover:bg-red-700 transition-all shadow-xl"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 lg:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">Shopping <span className="text-red-600">Cart</span> ({state.cart.length})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {state.cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-32 aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800 uppercase text-lg line-clamp-1">{item.name}</h3>
                    <button 
                      onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: item.id, size: item.selectedSize, color: item.selectedColor } })}
                      className="text-gray-400 hover:text-red-600 p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-gray-500 mb-6 uppercase">
                    <span className="bg-gray-100 px-2 py-1 rounded">Size: {item.selectedSize}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Color: {item.selectedColor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                      <button 
                        onClick={() => item.quantity > 1 && dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, size: item.selectedSize, color: item.selectedColor, quantity: item.quantity - 1 } })}
                        className="p-2 text-gray-500 hover:text-black transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: item.id, size: item.selectedSize, color: item.selectedColor, quantity: item.quantity + 1 } })}
                        className="p-2 text-gray-500 hover:text-black transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-xl">₹{item.price * item.quantity}</p>
                      <p className="text-xs text-green-600 font-bold">You saved ₹{(item.originalPrice - item.price) * item.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/products" className="inline-flex items-center gap-2 text-red-600 font-black text-sm uppercase group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </Link>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 sticky top-32">
              <h2 className="text-xl font-black uppercase mb-6 border-b border-gray-100 pb-4">Bill Details</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Cart Total</span>
                  <span className="text-gray-900 font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>GST (Tax)</span>
                  <span className="text-gray-900 font-bold">Inclusive</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping Fee</span>
                  <span className={shipping === 0 ? 'text-green-600 font-bold' : 'text-gray-900 font-bold'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-center bg-green-50 text-green-700 p-3 rounded-xl text-sm font-bold border border-green-100">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-8 pt-4 border-t border-gray-100">
                <span className="text-lg font-black uppercase">Total Amount</span>
                <span className="text-2xl font-black text-red-600">₹{total}</span>
              </div>
              <div className="space-y-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 shadow-xl shadow-red-200 transition-all active:scale-95 uppercase"
                >
                  Place Order
                </button>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <ShieldCheck className="text-red-600 flex-shrink-0" />
                  <p className="text-[10px] leading-tight text-red-700 font-bold uppercase">
                    SS Super Squad members get flat ₹250 discount and FREE delivery on every order. 
                    <button className="underline ml-1">Learn More</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
