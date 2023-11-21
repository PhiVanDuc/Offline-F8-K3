import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // name/function
        increase: (state, action) => {
            state.count = state.count + action.payload;
        },
        decrease: (state, action) => {
            state.count = state.count - action.payload;
        }
    }
})