"use client";
import { addToCart, removeFromCart } from "@/app/redux/cart.slice";
import { RootState, useAppDispatch, useAppSelector } from "@/app/redux/store";
import { FC, useMemo } from "react";
import { ProductCardProps } from "../ProductCard/types";

const AddToCartBtn: FC<ProductCardProps> = ({ product }) => {
  const cart = useAppSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const isAddedToCart = useMemo(() => {
    return cart.some((item) => item.product.id === product.id);
  }, [product.id, cart]);

  return (
    <button
      className={`bg-blue-500 text-white py-2 px-4 rounded-md block text-center w-full ${
        isAddedToCart && "bg-green-500"
      }`}
      onClick={(e) => {
        e.preventDefault();
        dispatch(
          isAddedToCart
            ? removeFromCart(product.id)
            : addToCart({ product, quantity: 1 })
        );
      }}
    >
      {isAddedToCart ? "Added" : "Add To Cart"}
    </button>
  );
};

export default AddToCartBtn;
