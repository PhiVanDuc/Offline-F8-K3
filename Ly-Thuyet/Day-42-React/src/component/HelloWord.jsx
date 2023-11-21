import React from 'react'
import { useContext2 } from '../hook/hook'
import { MyContext } from '../App'

export default function HelloWord() {
    const data = useContext2(MyContext);
    console.log(data);
    console.log(MyContext);

    return (
        <div>
            <h1>Hello F8</h1>
        </div>
    )
}


// Context
// 1. Đối tượng context
// 2. Provider
// 3. Consumer