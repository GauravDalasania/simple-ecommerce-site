'use client';
import { useState } from "react";

const AddToCartBtn = () => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    return (
        <button
            className={`bg-blue-500 text-white py-2 px-4 rounded-md block text-center w-full ${isAddedToCart && 'bg-green-500'}`}
            onClick={(e) => {
                e.preventDefault();
                setIsAddedToCart(prev => !prev);
            }}
        >
            {isAddedToCart ? 'Added' : 'Add To Cart'}
        </button>
    )
}

export default AddToCartBtn;