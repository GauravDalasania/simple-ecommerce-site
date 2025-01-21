'use client'
import { useState, useEffect, useMemo, use } from 'react';
import Header from './components/Header/Header';
import ProductCard from './components/ProductCard/ProductCard';
import SearchAndSort from './components/SearchAndSort/SearchAndSort';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

interface SearchParams {
  take?: number;
  skip?: number;
  search?: string;
  sort?: string;
}

async function fetchProducts({ take = 10, skip = 0, search = '', sort = '' }: SearchParams): Promise<FetchProductsResponse> {
  const res = await fetch(
    `https://prodapp.lifepharmacy.com/api/v1/products?take=${take}&skip=${skip}&search=${search}&sort=${sort}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default function RootPage({ searchParams }: { searchParams: SearchParams }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    fetchProducts(searchParams).then(({ products, total }) => {
      setProducts(products);
      setTotal(total);
    });
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('search', value);
    url.searchParams.delete('skip');
    window.location.href = url.toString();
  };

  const handleSortChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort', value);
    url.searchParams.delete('skip');
    window.location.href = url.toString();
  };

  return (
    <div className="p-6">
      <Header cartItemCount={cartItems.length} />
      <SearchAndSort
        searchValue={searchParams?.search || ''}
        sortValue={searchParams?.sort || ''}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(Math.ceil(total / (searchParams?.take || 10))).keys()]?.map((i) => (
          <button
            key={i}
            className={`py-2 px-4 rounded-md ${i * (searchParams?.take || 10) === Number(searchParams?.skip || 0) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => {
              const url = new URL(window.location.href);
              url.searchParams.set('skip', (i * (searchParams?.take || 10)).toString());
              window.location.href = url.toString();
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}