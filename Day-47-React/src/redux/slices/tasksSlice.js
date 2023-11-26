import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { client } from '../../utilities/client'

const initialState = {
    columns: [],
    tasks: [],
    status: "idle",
}

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        deleteTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task._id === action.payload);
            state.tasks.splice(index, 1);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.columns = action.payload.columns;
            state.tasks = action.payload.tasks;
            state.status = "fulfilled"
        })
        .addCase(getTasks.pending, (state) => {
            state.status = "pending";
        })
        .addCase(getTasks.rejected, (state) => {
            state.status = "rejected";
        })
    }
});

// Middleware

export const getTasks = createAsyncThunk("getTasks", async () => {
    const { response, data } = await client.get("/tasks");
    if (response.ok) return data.data;
})