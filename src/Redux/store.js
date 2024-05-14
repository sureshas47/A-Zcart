import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/products/productSlice"; // i am exporting productSlice.reducer as a default, I can name it anything and use it here

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
