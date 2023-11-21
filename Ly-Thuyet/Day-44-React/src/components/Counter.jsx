import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { counterSlice } from '../redux/slice/counterSlice'
const { increase, decrease } = counterSlice.actions;

export default function Counter() {
    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.count);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button 
                onClick={() => {
                    dispatch(increase(10))
                }}>+</button>
            <button 
                onClick={() => {
                    dispatch(decrease(5))
                }}>-</button>
        </div>
    )
}

// Component --> Action Creator --> Action --> Reducer