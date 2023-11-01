import React, { Component, Fragment } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import TodoFormEdit from './TodoFormEdit'
import { client } from '../api/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default class TodoWrap extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.handleGetApi();
  }

  addKeyEdit = (array) => {
    this.setState({
      todos: array.map((element) => {
        element.isEdit = false;
        return element;
      }),
    })
  }

  handleGetApi = async () => {
    const { response, data } = await client.get(`/api-key?email=phivanduc325@gmail.com`);

    if (response.ok) {
      client.setApiKey(data.data.apiKey);

      toast.success('Success get API-Key!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      const { data: dataLoad } = await client.get("/todos");
      this.addKeyEdit(dataLoad.data.listTodo);
    }
    else {
      toast.error('Failed get API-Key!', {
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

  addTodo = async () => {
    const { data: dataLoad } = await client.get("/todos");
    this.addKeyEdit(dataLoad.data.listTodo);
  }

  handleDelete = (deleteId) => {
    const catchTodo = this.state.todos.find(({ _id }) => {
      return _id === deleteId;
    });

    const handleClick = async () => {
      const { response } = await client.delete(`/todos/${catchTodo._id}`);
      if (response.ok) {
        toast.success('Success delete todo!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          const newTodos = this.state.todos.filter(({ _id }) => {
            return _id !== deleteId;
          });
          this.addKeyEdit(newTodos);
      }
      else {
        toast.error('Failed delete todo!', {
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

    toast.warn('Click to confirm.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: handleClick,
    });
  }

  editTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        return todo._id === id ? { ...todo, isEdit: !todo.isEdit } : todo;
      }),
    });
  } 

  handleUpdate = async (id, todo, isCompleted = false) => {
    const { response } = await client.patch(`/todos/${id}`, {todo, isCompleted});

    if (response.ok) {
      const { data: dataLoad } = await client.get("/todos");
      this.addKeyEdit(dataLoad.data.listTodo);

      toast.success('Success update todo!', {
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
    else {
      toast.error('Failed update todo!', {
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

  render() {
    return (
      <div className='todo-wrap'>
        <h2>Welcome to Todo App!</h2>
        <TodoForm addTodo={this.addTodo} handleApi={this.handleApi} />

        {
          this.state.todos.map((element, index) => {
            return element.isEdit ? <TodoFormEdit key={index} todo={element} handleDelete={this.handleDelete} editTodo={this.editTodo} handleUpdate={this.handleUpdate} /> : <Todo key={index} todo={element} handleDelete={this.handleDelete} editTodo={this.editTodo}/>
          })
        }
        <ToastContainer />
      </div>
    )
  }
}