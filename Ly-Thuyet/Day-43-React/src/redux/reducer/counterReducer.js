const initialState = {
    count: 0,
}

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "counter/increase": {
            return {
                ...state,
                count: state.count + 1,
            }
        }
        case "counter/decrease": {
            return {
                ...state,
                count: state.count - 1,
            }
        }
        default: {
            return state;
        }
    }
}