import axios from "axios";

const cartApi = axios.create({
  baseURL: `${import.meta.env.VITE_CART_URL}`,
});

export default cartApi;
