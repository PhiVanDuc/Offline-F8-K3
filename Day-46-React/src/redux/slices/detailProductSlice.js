import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    detailProduct: [],
    status: "idle",
}

export const detailProductSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchDetailProduct.fulfilled, (state, action) => {
            state.detailProduct = action.payload;
            state.status = "fulfilled";
        })
        .addCase(fetchDetailProduct.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchDetailProduct.rejected, (state) => {
            state.status = "rejected";
        })
    }
})

// Middleware

// export const fetchDetailProduct = (_id) => {
//     return async (dispatch) => {
//         const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${_id}`);
//         const data = await response.json();
//         dispatch(detailProductSlice.actions.updateDetailProduct(data.data))
//     }
// }

export const fetchDetailProduct = createAsyncThunk("fetchDetailProduct", async (_id) => {
    const response = await fetch(`https://api-exercise-sopi.vercel.app/api/v1/products/${_id}`);
    const data = await response.json();
    return data.data;
})