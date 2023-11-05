import React, { useReducer } from 'react'
import {reducer} from './reducer'

export default function App01() {
    const initialState = {
        count: 0,
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleIncrement = () => {
        dispatch({
            type: "counter/increment",
            payload: 10,
        });
    }

    const handleDecrement = () => {
        dispatch({
            type: "counter/decrement",
        });
    }

    return (
        <div>
            <h1>Count: </h1>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}