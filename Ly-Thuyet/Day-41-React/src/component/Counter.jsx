// 3. Consumer => Nhận dữ liệu (useContext) 
import React, { useState, useContext } from 'react'
import { MyContext } from '../App';
import "./theme.css";

export default function Counter() {
    const [count, setCount] = useState(0);
    const data = useContext(MyContext);

    const handleIncrease = () => {
        setCount(count + Number(data.step));
    }

    const handleDecrease = () => {
        setCount(count - Number(data.step))
    }

    return (
        <div style={{ padding: "20px", margin: "20px" }} className={data.theme}>
            <h1>Count: {count}</h1>
            <button style={{ marginRight: "5px" }} onClick={handleDecrease}>-</button>
            <button onClick={handleIncrease}>+</button>
        </div>
    )
}
