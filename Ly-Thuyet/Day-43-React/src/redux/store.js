import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import { counterReducer } from "./reducer/counterReducer";
import { todoReducer } from "./reducer/todoReducer";
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    counter: counterReducer,
    todos: todoReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));