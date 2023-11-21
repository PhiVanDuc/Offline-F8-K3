import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoList: [],
    posts: [],
    status: "idle",
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        app: (state, action) => {
            state.todoList = [
                ...state.todoList,
                action.payload,
            ]
        },
        // updatePosts: (state, action) => {
        //     state.posts = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = "fulfilled";
        }).addCase(fetchTodos.pending, (state) => {
            state.status = "pending";
        }).addCase(fetchTodos.rejected, (state) => {
            state.status = "rejected";
        })
    }
})

// Redux thunk
// export const fetchPosts = () => {
//     return async (dispatch) => {
//        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//        const data = await response.json();
//        dispatch(todoSlice.actions.updatePosts(data));
//     }
// }

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
});