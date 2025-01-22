'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/app/page';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border rounded-md p-4 hover:shadow transition-all duration-300 hover:scale-105">
        <div className='h-40 w-full relative'>
          <div className='right-0 w-5 h-5 absolute z-10'>
            <FontAwesomeIcon
              icon={isWishlisted ? faHeart : faHeartRegular}
              height={20}
              width={20}
              type='solid'
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(prev => !prev)
              }} />
          </div>
          <Image src={product.images.featured_image} alt={product.title} className="w-full h-40 object-cover mb-4" fill={true} />
        </div>
        <h2 className="text-lg font-semibold mb-2 h-20 line-clamp-3 my-4">{product.title}</h2>
        <p className="font-medium text-gray-700 mb-4">${product.sale.regular_price}</p>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded-md block text-center w-full ${isAddedToCart && 'bg-green-500'}`}
          onClick={(e) => {
            e.preventDefault();
            setIsAddedToCart(prev => !prev);
          }}
        >
          {isAddedToCart ? 'Added' : 'Add To Cart'}
        </button>
      </div>
    </Link>
  )
};

export default ProductCard;