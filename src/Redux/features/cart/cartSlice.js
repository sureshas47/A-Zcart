import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  productCount: 0,
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.carts = [...state.carts, action.payload];
      state.productCount = state.carts.length;
    },
    removeProductFromCart: (state, action) => {
      const filteredCart = (state.carts = state.carts.filter((cart) => {
        cart.id !== action.payload;
      }));
      state.carts = filteredCart;
      state.productCount = state.carts.length;
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
