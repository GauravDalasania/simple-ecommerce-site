'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ProductCardProps } from './types';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import ProductPrice from '../ProductPrice/ProductPrice';


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="border rounded-md p-4 hover:shadow transition-all duration-300 hover:scale-105">
        <div className='h-40 w-full relative'>
          <div className='right-0 w-5 h-5 absolute z-10'>
            <FontAwesomeIcon
              icon={isWishlisted ? faHeart : faHeartRegular}
              height={20}
              width={20}
              onClick={(e) => {
                e.preventDefault();
                setIsWishlisted(prev => !prev)
              }} />
          </div>
          <Image src={product.images.featured_image} alt={product.title} className="w-full h-40 object-cover mb-4" fill={true} />
        </div>
        <h2 className="text-lg font-semibold mb-2 h-20 line-clamp-3 my-4">{product.title}</h2>
        <ProductPrice {...product.sale} />
        <AddToCartBtn product={product} />
      </div>
    </Link>
  )
};

export default ProductCard;