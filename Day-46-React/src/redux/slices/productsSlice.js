import { createSlice } from "@reduxjs/toolkit"
import { client } from "../../api/client"

const initialState = {
    products: [],
    totalPage: 0,
    status: "idle",
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateProducts: (state, action) => {
            state.products = action.payload;
        },
        updateTotalPage: (state, action) => {
            state.totalPage = action.payload;
        }
    }
})

export const fetchProducts = (page, limit) => {
    return async (dispatch) => {
        const { data } = await client.get(`/products?page=${page}&limit=${limit}`);
        dispatch(productsSlice.actions.updateProducts(data.data.listProduct));
    }
}

export const fetchTotalPage = () => {
    return async (dispatch) => {
        const { data } = await client.get(`/products`);
        dispatch(productsSlice.actions.updateTotalPage(Math.ceil((data.data.totalPage * 10) / 20)));
    }
}