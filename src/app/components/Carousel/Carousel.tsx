'use client'
import { ProductGallery } from '@/app/products/types'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useState } from 'react'

interface Product extends ProductGallery {
    id: number
}

interface ProductCarouselProps {
    products: Product[]
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    // Implement carousel logic here

    const [currentSlide, setCurrentSlide] = useState(0);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % products.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)

    return (
        <div className="relative overflow-hidden h-full">
            <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {products.map((product) => (
                    <div key={product.id} className="w-full flex-shrink-0 flex items-center justify-center flex">
                        <div className="relative h-[300px] w-[300px] ">
                            <Image
                                fill={true}
                                src={product.medium}
                                alt={'product'}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
            {/* Navigation arrows */}
            <button
                onClick={prevSlide}
                className="absolute w-7 h-7 left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition duration-300"
            >
                <FontAwesomeIcon icon={faChevronLeft} className='w-4 h-4' />
            </button>
            <button
                onClick={nextSlide}
                className="absolute w-7 h-7 right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full transition duration-300"
            >
                <FontAwesomeIcon icon={faChevronRight} className='w-4 h-4' />
            </button>
            {/* Dots navigation */}
            <div className="absolute bottom-2 left-0 right-0">
                <div className="flex items-center justify-center gap-2">
                    {products.map((_, i) => (
                        <button
                            key={i}
                            className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${currentSlide === i ? 'bg-blue-500 scale-110' : 'bg-black bg-opacity-50'}
              `}
                            onClick={() => setCurrentSlide(i)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCarousel