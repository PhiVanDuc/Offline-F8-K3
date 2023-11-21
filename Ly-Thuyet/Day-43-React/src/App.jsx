import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './redux/action/counterAction';
import { fetchTodo } from './redux/middleware/fetchTodo';

export default function App() {
  const count = useSelector(state => state.counter.count);
  const listTodo = useSelector(state => state.todos.todoList);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increase());
  }

  const handleDecrease = () => {
    dispatch(decrease());
  }

  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  return (
    <div>
      <h2>Học Redux</h2>
      <h2>Count: {count}</h2>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleDecrease}>-</button>
      <h2>Todos List</h2>
      {
        listTodo.map(({ id, title }) => {
          return <h3 key={id}>{title}</h3>
        })
      }
    </div>
  )
}


// Action creator
// Là một hàm trả về một action 
// Component --> Dispatch --> Middleware --> Reducer --> Update State --> Component