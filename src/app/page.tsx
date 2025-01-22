
import { useState, useEffect, useMemo, use } from 'react';
import Header from './components/Header/Header';
import ProductCard from './components/ProductCard/ProductCard';
import SearchAndSort from './components/SearchAndSort/SearchAndSort';
import Link from 'next/link';

export interface Product {
  id: string;
  title: string;
  inventory: Inventory;
  slug: string;
  categories: Category[];
  pre_order: boolean;
  type: string;
  images: Images;
  label: Label;
  ad: boolean;
  ad_id: string;
  rating: string;
  stock: Stock;
  sale: Sale;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Images {
  featured_image: string;
  featured_video: null;
  other_images: any[];
  gallery_images: GalleryImage[];
}

export interface GalleryImage {
  image: string;
  thumbnail: string;
  medium: string;
  full: string;
}

export interface Inventory {
  sku: string;
}

export interface Label {
  label_text: string;
  sub_label_text: null;
  icon_type: string;
  color_code: string;
}

export interface Sale {
  currency: string;
  regular_price: number;
  offer_price: number;
  offer_label: string;
  offer_type: string;
  member_price: number;
  subscription_price: number;
}

export interface Stock {
  max: number;
  delivery_icons: DeliveryIcon[];
}

export interface DeliveryIcon {
  until: string;
  icon: string;
  label: string;
}

interface FetchProductsResponse {
  data: {
    products: Product[]
  }
}

interface SearchParams {
  take?: number;
  page?: number;
  search?: string;
  sort?: string;
}

async function fetchProducts({ take = 12, page = 1, }: SearchParams): Promise<FetchProductsResponse> {
  const skip = (page - 1) * take;
  const res = await fetch(
    `https://prodapp.lifepharmacy.com/api/v1/products?take=${take}&skip=${skip}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function RootPage(props: { searchParams: Promise<SearchParams> }) {
  const searchParams = await props.searchParams;
  const data = await fetchProducts(searchParams);
  const products = data.data.products;
  const page = searchParams.page || 1;

  // const handleSearchChange = (value: string) => {
  //   const url = new URL(window.location.href);
  //   url.searchParams.set('search', value);
  //   url.searchParams.delete('skip');
  //   window.location.href = url.toString();
  // };

  // const handleSortChange = (value: string) => {
  //   const url = new URL(window.location.href);
  //   url.searchParams.set('sort', value);
  //   url.searchParams.delete('skip');
  //   window.location.href = url.toString();
  // };

  return (
    <div className='w-full h-full grid place-items-center'><span className='mb-48'>Welcome to the website!</span></div>
  );
}