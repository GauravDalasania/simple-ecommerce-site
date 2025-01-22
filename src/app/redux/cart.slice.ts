import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types";

interface CartItem {
  product: Product;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: Array<CartItem>(),
  reducers: {
    addToCart: (state: CartItem[], action: PayloadAction<CartItem>) => {
      const itemExists = state.find(
        ({ product }) => product.id === action.payload.product.id
      );
      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state: CartItem[], action: PayloadAction<string>) => {
      const index = state.findIndex(
        ({ product }) => product.id === action.payload
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;
