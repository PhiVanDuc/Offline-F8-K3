/*
    slice: Tổng hợp mọi thứ liên quan đến một feature
    - reducer
    - state
    - action
*/

import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./slice/counterSlice";
import { todoSlice } from "./slice/todoSlice"

export const store = configureStore(
    {
        reducer: {
            counter: counterSlice.reducer,
            todos: todoSlice.reducer,
        }
    }
);