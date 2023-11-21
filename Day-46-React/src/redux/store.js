import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productsSlice";
import { detailProductSlice } from "./slices/detailProductSlice"
import { cartsSlice } from "./slices/cartsSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        detailProduct: detailProductSlice.reducer,
        carts: cartsSlice.reducer,
    }
})