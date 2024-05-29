import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const initialState = {
  singleProduct: {},
  isLoading: false,
  error: null,
};

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (productId) => {
    const res = await axios(`${baseUrl}/products/${productId}`);
    const data = await res.data;
    return data;
  }
);

export const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default singleProductSlice.reducer;
