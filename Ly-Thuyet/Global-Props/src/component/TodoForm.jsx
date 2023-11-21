import React, { useState } from 'react'
import { useDispatch } from '../core/core';

export default function TodoForm() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch({
            type: "todo/add",
            payload: name,
        })
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }

    return (
        <div>
            <form action="" onSubmit={handleAdd}>
                <input type="text" placeholder='Name...' onChange={handleChange} />
                <button>Add</button>
            </form>
        </div>
    )
}