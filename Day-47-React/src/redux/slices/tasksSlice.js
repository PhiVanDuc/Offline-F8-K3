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
        updateColumns: (state, action) => {
            state.columns = action.payload;
        },
        updateTasks: (state, action) => {
            state.tasks = action.payload;
        },
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fetchAddColumn);
    },
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.columns = action.payload.columns;
            state.tasks = action.payload.tasks;

            if (state.columns.length === 0) {
                localStorage.setItem("tempColumn", 9999999);
                localStorage.setItem("orderColumn", 1);
            }

            state.columns.forEach((column) => {
                column.order = JSON.parse(localStorage.getItem("orderColumn"));
            });

            if (state.tasks.length === 0) {
                localStorage.setItem("tempTask", 999999999);
                localStorage.setItem("orderTask", 1);
            }

            state.tasks.forEach((task) => {
                task.order = JSON.parse(localStorage.getItem("orderTask"));
            });

            state.status = "fulfilled";
        })
        .addCase(getTasks.pending, (state) => {
            state.status = "pending";
        })
        .addCase(getTasks.rejected, (state) => {
            state.status = "rejected";
        })
        .addCase(fetchAddColumn.fulfilled, (state, action) => {
            state.columns = [
                ...state.columns,
                action.payload.column
            ];
            state.tasks = [
                ...state.tasks,
                action.payload.task
            ];

            state.status = "fulfilled";
        })
        .addCase(fetchAddColumn.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchAddColumn.rejected, (state) => {
            state.status = "rejected";
        })
        .addCase(fetchDeleteColumn.fulfilled, (state, action) => {
            for (let i = state.columns.length - 1; i >= 0; i--) {
                if (state.columns[i].column === action.payload.column)
                    state.columns.splice(i, 1);
            }

            for (let i = state.tasks.length - 1; i >= 0; i--) {
                if (state.tasks[i].column === action.payload.column)
                    state.tasks.splice(i, 1);
            }

            state.status = "fulfilled";
        })
        .addCase(fetchDeleteColumn.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchDeleteColumn.rejected, (state) => {
            state.status = "rejected";
        })
        .addCase(fetchAddTask.fulfilled, (state, action) => {
            state.tasks = [
                ...state.tasks,
                action.payload,
            ]

            state.status = "fulfilled";
        })
        .addCase(fetchAddTask.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchAddTask.rejected, (state) => {
            state.status = "rejected";
        })
        .addCase(fetchDeleteTask.fulfilled, (state, action) => {
            for (let i = state.tasks.length - 1; i >= 0; i--) {
                if (state.tasks[i]._id === action.payload.idTask) {
                    state.tasks.splice(i, 1);
                    break;
                }
            }

            state.status = "fulfilled";
        })
        .addCase(fetchDeleteTask.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchDeleteTask.rejected, (state) => {
            state.status = "rejected";
        })
        .addCase(fetchChangeColumnName.fulfilled, (state, action) => {
            state.columns.forEach((column, index) => {
                if (column.column === action.payload.column) {
                    state.columns[index] = action.payload;
                    return;
                }
            })
            state.status = "fulfilled";
        })
        .addCase(fetchChangeColumnName.pending, (state) => {
            state.status = "pending";
        })
        .addCase(fetchChangeColumnName.rejected, (state) => {
            state.status = "rejected";
        })
    }
});

// Middleware

export const getTasks = createAsyncThunk("getTasks", async () => {
    const { response, data } = await client.get("/tasks");
    if (response.ok) {
        return data.data;
    }
});

export const fetchAddColumn = createAsyncThunk("fetchAddColumn", async (payload) => {
    const { res, newCol } = payload;
    const format = [
        ...res,
        {
            column: newCol.column,
            content: newCol.content,
            columnName: newCol.columnName,
        }
    ]

    const { response } = await client.post("/tasks", format);
    if (response.ok) {
        return {
            column: {
                _id: newCol.idColumn,
                column: newCol.column,
                columnName: newCol.columnName,
                order: newCol.orderColumn,
            },
            task: {
                _id: newCol.idTask,
                column: newCol.column,
                content: newCol.content,
                order: newCol.orderTask,
            }
        }
    }
});

export const fetchDeleteColumn = createAsyncThunk("fetchDeleteColumn", async (payload) => {
    const { res, deleteCol } = payload;

    const { response } = await client.post("/tasks", res);
    if (response.ok) {
        return deleteCol;
    }
});

export const fetchAddTask = createAsyncThunk("fetchAddTask", async (payload) => {
    const { res, newTask } = payload;

    const format = [
        ...res,
        {
            column: newTask.column,
            content: newTask.content,
            columnName: newTask.columnName,
        }
    ]

    const { response } = await client.post("/tasks", format);
    if (response.ok) {
        return {
            _id: newTask.idTask,
            column: newTask.column,
            content: newTask.content,
        }
    }
});

export const fetchDeleteTask = createAsyncThunk("fetchDeleteTask", async (payload) => {
    const { res, deleteTask } = payload;
    
    const format = res.map((element) => {
        return {
            column: element.column,
            content: element.content,
            columnName: element.columnName,
        }
    });

    const { response } = await client.post("/tasks", format);
    if (response.ok) {
        return deleteTask;
    }
});

export const fetchChangeColumnName = createAsyncThunk("fetchChangeColumnName", async (payload) => {
    const { res, newColumnName } = payload;
    const { response } = await client.post("/tasks", res);
    if (response.ok) {
        return newColumnName
    }
});