export const initialState = {
    todo: [],
}

export const rootReducer = (state, action) => {
    switch (action.type) {
        case "todo/add": {
            return {
                ...state,
                todo: [
                    ...state.todo,
                    action.payload,
                ]
            }
        }
        default:
            return state;
    }
}