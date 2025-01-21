// /components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="border rounded-md p-4">
    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4" />
    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
    <p className="font-medium text-gray-700 mb-4">${product.price}</p>
    <Link href={`/products/${product.id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md block text-center">
      View Details
    </Link>
  </div>
);

export default ProductCard;