import React, { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        // setCount(count + 1)
        setCount((count) => {
            return count + 1;
        })
    }

    const handleDecrement = () => {
        // setCount(count - 1)
        setCount((count) => {
            return count - 1;
        })
    }

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}
