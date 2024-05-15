import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  productCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.carts = [...state.carts, action.payload];
      state.productCount = state.carts.length;
      console.log("carts", state.carts);
      console.log("productCount", state.productCount);
    },
    removeProductFromCart: (state, action) => {
      const itemId = action.payload;
      console.log("itemId", itemId);
      const filteredCart = state.carts?.filter((cart) => {
        return cart._id !== itemId;
      });
      console.log(filteredCart, "filteredCart");
      state.carts = filteredCart;
      state.productCount = state.carts.length;
    },
  },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
