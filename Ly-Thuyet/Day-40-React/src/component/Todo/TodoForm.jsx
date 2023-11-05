import React, { useState } from 'react'

export default function TodoForm({ handleSubmit, data }) {
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit(name)}}>
            <input onChange={handleChange} value={name} type="text" name="name" placeholder='Name...' />
            <button>Submit</button>
        </form>
    )
}
