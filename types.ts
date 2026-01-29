
export type Gender = 'MEN' | 'WOMEN' | 'KIDS';
export type CategoryType = 'T-Shirts' | 'Oversized Tees' | 'Shirts' | 'Hoodies' | 'Joggers' | 'Shorts' | 'Activewear' | 'Footwear' | 'Accessories' | 'Dresses';
export type ThemeType = 'Marvel' | 'DC' | 'Anime' | 'Disney' | 'Harry Potter' | 'IPL' | 'Originals';
export type RewardTier = 'SILVER' | 'GOLD' | 'PLATINUM';
export type AppTheme = 'light' | 'dark';
export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';
export type OrderStatus = 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Returned' | 'Hold (Fraud Risk)';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  memberPrice: number;
  originalPrice: number;
  images: string[];
  gender: Gender;
  category: CategoryType;
  theme?: ThemeType;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  stockCount: number;
  tags: string[]; 
  fit?: string;
  fabric?: string;
  warehouseId?: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userHandle: string;
  userImage: string;
  postImage: string;
  likes: number;
  taggedProducts: string[];
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isMember: boolean;
  tier: RewardTier;
  points: number;
  walletBalance: number;
  referralCode: string;
  role: 'USER';
  addresses: Address[];
  lastLoginIp?: string;
  deviceFingerprint?: string;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  gst: number;
  total: number;
  status: OrderStatus;
  date: string;
  paymentMethod: 'Prepaid' | 'COD' | 'Wallet' | 'Split (Wallet + Card)';
  trackingNumber: string;
  otpVerified?: boolean;
  fraudScore?: number;
  courierPartner?: string;
}

export interface State {
  theme: AppTheme;
  currency: CurrencyCode;
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User | null;
  orders: Order[];
  stories: Story[];
  communityPosts: CommunityPost[];
  location: { city: string; pincode: string; country: string; zone: string };
  splashActive: boolean;
  notifications: Array<{ id: string; text: string; type: string }>;
}
