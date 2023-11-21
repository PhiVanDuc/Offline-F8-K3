import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./slices/productsSlice";
import { detailProductSlice } from "./slices/detailProductSlice"

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        detailProduct: detailProductSlice.reducer,
    }
})