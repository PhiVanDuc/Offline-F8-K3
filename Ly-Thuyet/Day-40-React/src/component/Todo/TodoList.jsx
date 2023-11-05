import React, { useEffect, useState } from 'react'

export default function TodoList({ data }) {
    const [todo, setTodo] = useState([
        {
            id: 1,
            name: "Công việc 1",
        },
        {
            id: 2,
            name: "Công việc 2",
        }
    ]);

    useEffect(() => {
        if (data) {
            setTodo((prevTodo) => {
                return [
                    ...prevTodo,
                    {
                        id: prevTodo.length + 1,
                        name: data,
                    }
                ]
            });
        }
    }, [data]);

    console.log(todo);

    return (
        <div>
            {
                todo.map(({id, name}) => {
                    return <h3 key={id}>{name}</h3>
                })
            }
        </div>
    )
}
