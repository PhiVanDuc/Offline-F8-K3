import React from 'react'
import { useSelector } from '../core/core';

export default function TodoList() {
    const { todo } = useSelector();

    return (
        <div>
            <ul>
                {
                    todo.map((todo, index) => {
                        return <li key={index}>{todo}</li>
                    })
                }
            </ul>
        </div>
    )
}
