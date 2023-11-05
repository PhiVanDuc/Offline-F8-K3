import React, { Component, useEffect, useRef, useState } from 'react'
import { client } from '../api/client';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function TodoForm({ addTodo, htmlStrip, handleError, handleSuccess, updateSearchTodos }) {
  const [nameTask, setNameTask] = useState("");
  const [search, setSearch] = useState(false);

  const handleChange = (e) => {
    setNameTask(htmlStrip(e.target.value));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (/^.{2,}$/.test(nameTask)) {
      const { response } = await client.post('/todos', {todo: nameTask});
      if (response.ok) {
        addTodo(nameTask);
        setNameTask("");
        setSearch(false);
        handleSuccess("Success add todo!");
      }
      else {
        handleError("Failed add, click to reload!");
      }
    }
    else {
      toast.warn('Type more than 1 character!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const handleUpdateSearch = () => {
    if (!search) {
      setSearch(true);
    }
    handleSuccess("Search function enabled!");
    updateSearchTodos(nameTask);
  } 

  const isMounted = useRef(false);
  useEffect(() => {
    if (search) {
      if (!isMounted.current) {
        isMounted.current = true;
        return;
      }
  
      const debounce = setTimeout(() => {
        updateSearchTodos(nameTask);
      }, 1000);
      return () => {
        clearTimeout(debounce);
      }
    }
  }, [nameTask])

  return (
    <form action="" className="todo-form" onSubmit={handleSubmit}>
      <input value={nameTask} onChange={handleChange} type="text" className="input-add" placeholder="Thêm một việc làm mới" />
      <button className="button-add">Thêm mới</button>
      <button type='button' className='button-search' onClick={handleUpdateSearch}>Tìm kiếm</button>
    </form>
  )
}