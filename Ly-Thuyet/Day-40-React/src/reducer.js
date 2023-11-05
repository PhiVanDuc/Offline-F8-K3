export const reducer = (state, action) => {
    switch (action.type) {
        case "counter/increment": {
            return {...state, count: state.count + action.payload};
        }
        case "coutner/decrement": {
            return {...state, count: state.count - 1};
        }
        default: {
            return state;
        }
    }
}