import { Smartphone, Headphones, Laptop, Mouse, Home, LayoutGrid } from 'lucide-react';

// --- INTERFACES Y DATOS ---

export interface StorePrice {
    store: string;
    logo: string;
    price: number;
    shipping: string;
    url: string;
}

export interface Category {
    name: string;
    icon: keyof typeof iconComponents;
    slug: string;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  category: string;
  description: string;
  storePrices: StorePrice[];
}

export interface PaginatedResponse {
    totalCount: number;
    page: number;
    limit: number;
    data: Product[];
}

export const iconComponents = { Smartphone, Headphones, Laptop, Mouse, Home, LayoutGrid };

export type View = 'home' | 'categories' | 'favorites' | 'account' | 'product-detail';
export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc';
