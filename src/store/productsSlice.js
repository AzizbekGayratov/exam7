import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
    cartCount: 0,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
      state.cartCount = state.cart.length;
      localStorage.setItem("examCart", JSON.stringify(state.cart));
    },
    setCart(state, action) {
      state.cart = action.payload;
      state.cartCount = state.cart.length;
      localStorage.setItem("examCart", JSON.stringify(state.cart));
    },
    deleteProductFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.cartCount = state.cart.length;
      localStorage.setItem("examCart", JSON.stringify(state.cart));
    },
    proccessToCheckout(state) {
      state.cart = [];
      state.cartCount = 0;
      localStorage.setItem("examCart", JSON.stringify(state.cart));
    },
  },
});

export const {
  setProducts,
  addToCart,
  setCart,
  deleteProductFromCart,
  proccessToCheckout,
} = productsSlice.actions;
export default productsSlice.reducer;
