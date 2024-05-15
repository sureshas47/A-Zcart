import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/products/productSlice"; // i am exporting productSlice.reducer as a default, I can name it anything and use it here
import cartReducer from "./features/cart/cartSlice";
import singleProductReducer from "./features/products/singleProductSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
    singleProduct: singleProductReducer,
  },
});

export default store;
