export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand?: string;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isTrending: boolean;
  tags: string[];
  specs?: Record<string, string>;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface OrderItem {
  product: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  user: { _id: string; name: string; email: string };
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: 'pending' | 'approved' | 'dispatched' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
  trackingNumber?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountPercentage: number;
  maxDiscount?: number;
  minOrderValue: number;
  expiresAt: string;
  isActive: boolean;
}

export interface InventoryItem {
  _id: string;
  product: Product;
  productTitle: string;
  sku: string;
  stock: number;
  lowStockThreshold: number;
  lastRestockedAt?: string;
}
