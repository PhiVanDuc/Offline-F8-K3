import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, todoSlice } from '../redux/slice/todoSlice'
import { useState } from 'react';
import { useEffect } from 'react';

const { app } = todoSlice.actions

export default function Todo() {
    const todoList = useSelector(state => state.todos.todoList);
    const posts = useSelector(state => state.todos.posts);
    const status = useSelector(state => state.todos.status)
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value.length) {
            alert('Nhập todo');
            return;
        }
        dispatch(app(value));
        setValue("");
    }

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div>
            <ul>
                {
                    todoList.map((todo, index) => {
                        return <li key={index}>{todo}</li>
                    })
                }
            </ul>
            <form onSubmit={handleSubmit}>
                <input type="text" value={value} onChange={handleChange}/>
                <button>Submit</button>
            </form>

            <h2>Posts</h2>
            {
                status === "pending" ? <h3>Loading...</h3> : posts.map(({ id, title }) => {
                    return <h3 key={id}>{title}</h3>
                })
            }
        </div>
    )
}
