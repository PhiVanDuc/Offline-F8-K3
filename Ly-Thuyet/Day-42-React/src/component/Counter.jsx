import React, { useEffect, useRef, useState } from 'react'
import Content from './Content';
import Button from './Button';
import { color } from '../libs/color';

function Counter() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const elementRef = useRef();
    const buttonRef = useRef();

    const handleIncrease = () => {
        setCount(count + 1)
        countRef.current++;
        console.log(countRef);
    }

    useEffect(() => {
        elementRef.current.style.color = "red";
        console.log(buttonRef);
    }, []);

    return (
        <div>
            <h1 ref={elementRef}>Counter: {count}</h1>
            <button onClick={handleIncrease}>+</button>
            <Content count={count} />
            <Button ref={{ buttonRef }} />
        </div>
    )
}

export default color(Counter);

// --> Bài tập: Xây dựng Hook useContext2
// Hook useRef