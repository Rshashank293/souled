
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, User, Order, State, AppTheme, CurrencyCode } from './types.ts';
import { PRODUCTS } from './mockData.ts';

type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_CURRENCY'; payload: CurrencyCode }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string; size: string; color: string } }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'CLOSE_SPLASH' }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: { text: string; type: string } }
  | { type: 'ADD_RECENTLY_VIEWED'; payload: string };

const safeParse = (key: string, fallback: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : JSON.parse(fallback);
  } catch (e) {
    return JSON.parse(fallback);
  }
};

const initialState: State = {
  theme: (localStorage.getItem('theme') as AppTheme) || 'light',
  currency: 'INR',
  products: PRODUCTS,
  cart: safeParse('cart', '[]'),
  wishlist: safeParse('wishlist', '[]'),
  user: {
    id: 'u1',
    name: 'Alex Mercer',
    email: 'alex@enterprise.com',
    isMember: true,
    tier: 'PLATINUM',
    points: 4500,
    walletBalance: 1200,
    referralCode: 'ALEX500',
    role: 'ADMIN',
    addresses: [
      { id: '1', type: 'Home', street: 'Skyview Towers, Block A', city: 'Mumbai', state: 'MH', pincode: '400001', phone: '9876543210', isDefault: true }
    ]
  },
  orders: safeParse('orders', '[]'),
  stories: [
    { id: '1', imageUrl: 'https://picsum.photos/seed/drop1/400/600', title: 'Winter 24', link: '/products' },
    { id: '2', imageUrl: 'https://picsum.photos/seed/collab1/400/600', title: 'Marvel X SS', link: '/products?theme=Marvel' },
    { id: '3', imageUrl: 'https://picsum.photos/seed/anime1/400/600', title: 'Anime Fest', link: '/products?theme=Anime' },
  ],
  communityPosts: [
    { id: 'c1', userId: 'u2', userHandle: 'style_master', userImage: 'https://i.pravatar.cc/150?u=2', postImage: 'https://picsum.photos/seed/look1/800/1000', likes: 1200, taggedProducts: ['p1'], description: 'Loving the oversized fit of this Marvel tee! #SoulSquad' }
  ],
  location: { city: 'Mumbai', pincode: '400001', country: 'India', zone: 'Metro' },
  splashActive: true,
  notifications: [],
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return { ...state, theme: newTheme };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'ADD_TO_CART':
      const existing = state.cart.find(i => i.id === action.payload.id && i.selectedSize === action.payload.selectedSize && i.selectedColor === action.payload.selectedColor);
      if (existing) {
        return { ...state, cart: state.cart.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i) };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => !(i.id === action.payload.id && i.selectedSize === action.payload.size && i.selectedColor === action.payload.color)) };
    case 'UPDATE_CART_QUANTITY':
      return { ...state, cart: state.cart.map(item => (item.id === action.payload.id && item.selectedSize === action.payload.size && item.selectedColor === action.payload.color) ? { ...item, quantity: action.payload.quantity } : item) };
    case 'PLACE_ORDER':
      return { ...state, orders: [action.payload, ...state.orders], cart: [] };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'TOGGLE_WISHLIST':
      return { ...state, wishlist: state.wishlist.includes(action.payload) ? state.wishlist.filter(id => id !== action.payload) : [...state.wishlist, action.payload] };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [{ id: Date.now().toString(), ...action.payload }, ...state.notifications] };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.cart, state.wishlist, state.orders]);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
