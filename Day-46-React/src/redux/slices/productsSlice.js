import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { client } from "../../utilities/client"

const initialState = {
    products: [],
    totalPage: 0,
    status: "idle",
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = 'fulfilled';
        })
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'pending';
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(fetchTotalPage.fulfilled, (state, action) => {
            state.totalPage = action.payload;
        })
    }
})

export const fetchProducts = createAsyncThunk("fetchProducts", async ({ param, limit }) => {
    const { data } = await client.get(`/products?page=${param}&limit=${limit}`);
    return data.data.listProduct;
});

export const fetchTotalPage = createAsyncThunk("fetchTotalPage", async () => {
    const { data } = await client.get(`/products`);
    return Math.ceil((data.data.totalPage * 10) / 20);
});