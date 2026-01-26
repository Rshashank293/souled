
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, ShoppingBag, Truck } from 'lucide-react';
import { useApp } from '../store';
import { useNavigate } from 'react-router-dom';

export const AIChatbot: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string }>>([
    { role: 'bot', text: `Hi ${state.user?.name || 'there'}! I'm SoulBot. Need help finding a Marvel tee or checking your order status?` }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are SoulBot, the official AI assistant for SoulStore. You are trendy, helpful, and use Gen-Z slang occasionally.
          Current User: ${state.user?.name}.
          Orders: ${JSON.stringify(state.orders.map(o => ({ id: o.id, status: o.status })))}.
          Available Products: ${JSON.stringify(state.products.map(p => ({ name: p.name, category: p.category, price: p.price })))}.
          Rules:
          1. If user asks for an order, check their order history.
          2. If user asks for products, suggest from the list.
          3. Keep it brief and friendly.
          4. If they want to buy something, tell them to search in the bar above.`
        }
      });

      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Sorry, I'm having a bit of a glitch. How can I help?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Looks like the multiverse is acting up. Try again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 lg:bottom-12 lg:right-12 z-[200]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform animate-bounce-slow flex items-center gap-3"
        >
          <Sparkles size={24} className="text-red-600" />
          <span className="hidden lg:block font-black text-xs uppercase tracking-widest">Ask SoulBot</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-neutral-900 w-80 lg:w-96 h-[500px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 dark:border-neutral-800 animate-in zoom-in-95 duration-300">
          <div className="bg-black p-6 text-white flex justify-between items-center">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center"><Sparkles size={20} /></div>
                <div>
                   <h4 className="font-black text-xs uppercase tracking-widest">SoulBot AI</h4>
                   <p className="text-[10px] text-green-500 font-bold uppercase tracking-tighter">Online & Ready</p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div ref={scrollRef} className="flex-grow p-6 space-y-4 overflow-y-auto no-scrollbar bg-gray-50 dark:bg-neutral-800/50">
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${m.role === 'user' ? 'bg-red-600 text-white rounded-tr-none' : 'bg-white dark:bg-neutral-900 text-gray-800 dark:text-white rounded-tl-none border border-gray-100 dark:border-neutral-800'}`}>
                    {m.text}
                  </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                  <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-neutral-800 flex gap-1">
                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                     <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
                  </div>
               </div>
             )}
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-neutral-800 flex gap-2">
             <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message SoulBot..." 
                className="flex-grow bg-gray-100 dark:bg-neutral-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-red-600 outline-none font-medium" 
             />
             <button onClick={handleSend} className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-colors">
               <Send size={20} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
