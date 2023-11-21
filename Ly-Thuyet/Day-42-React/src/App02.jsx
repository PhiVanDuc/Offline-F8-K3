import React, { useLayoutEffect, useState } from 'react'

export default function App02() {
    const [count, setCount] = useState(0);

    useLayoutEffect(() => {
        if (count === 5) {
            setCount(0)
        }
    })

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => { setCount(count + 1) }}>+</button>
        </div>
    )
}

/*
    Thứ tự của useEffect
    1. state thay đổi
    2. re-render
    3. UI update
    4. cleanup
    5. callback useEffect
*/

/*
    Thứ tự cập nhật của useLayoutEffect
    1. state thay đổi
    2. re-render
    3. cleanup
    4. callback useEffect
    5. UI update
*/