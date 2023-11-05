import React, { useState } from 'react'
import TodoList from './component/Todo/TodoList'
import TodoForm from './component/Todo/TodoForm'

export default function App() {
    const [data, setData] = useState("");

    const handleSubmit = (name) => {
      setData(name);
    }

    return (
      <div>
        <TodoList data={data}/>
        <hr />
        <TodoForm handleSubmit={handleSubmit} data={data}/>
      </div>
    )
}