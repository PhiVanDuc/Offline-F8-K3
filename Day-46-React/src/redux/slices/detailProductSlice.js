import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    detailProduct: [],
}

export const detailProductSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        updateDetailProduct: (state, action) => {
            state.detailProduct = action.payload;
        }
    }
})

// Middleware

export const fetchDetailProduct = (_id) => {
    return async (dispatch) => {
        const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${_id}`);
        const data = await response.json();
        dispatch(detailProductSlice.actions.updateDetailProduct(data.data))
    }
}