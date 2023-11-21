import React, { useContext } from 'react'
import { MyContext } from '../App'

export default function Vnd() {
    const data = useContext(MyContext);

    return (
        <div style={{ marginBottom: "10px" }}>
            Vnd: <input type="number" placeholder='Vnd...' defaultValue={data.vnd} onInput={(e) => {data.dispatch({ type: "vnd", payload: e.target.value })}}/>
        </div>
    )
}
