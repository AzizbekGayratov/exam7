import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
  },
});

export const { setProducts, addToCart } = productsSlice.actions;
export default productsSlice.reducer;
