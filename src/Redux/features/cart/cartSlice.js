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
      const { id, quantity } = action.payload; // get id and quantity from payload
      // find object with same id
      const existingItem = state.carts?.find((item) => item._id === id);
      if (existingItem) {
        // update quantity
        existingItem.quantity = existingItem.quantity + quantity;
      } else {
        // add new item
        state.carts = [...state.carts, action.payload];
        state.productCount = state.carts.length;
      }
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

export const { addProductToCart, removeProductFromCart, updateQuantityInCart } =
  cartSlice.actions;
export default cartSlice.reducer;
