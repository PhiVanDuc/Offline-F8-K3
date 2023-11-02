import React, { Component } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import TodoFormEdit from './TodoFormEdit'
import { client } from '../api/client'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PuffLoader from 'react-spinners/Puffloader'

export default class TodoWrap extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      loading: true,
    };
  }

  componentDidMount = async () => {
    if (!localStorage.getItem("api_key")) {
      const info = prompt("Vui lòng nhập email để tiếp tục:");
      this.handleGetApi(info);
    }
    else {
      const api_key = localStorage.getItem("api_key");
      client.setApiKey(JSON.parse(api_key));

      const { response, data } = await client.get("/todos");
      this.setState({ loading: false });

      if (!response.ok) {
        const info = prompt("Vui lòng nhập email để tiếp tục:");
        this.handleGetApi(info);
      }
      else {
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

        this.setState({
          todos: data.data.listTodo,
        });
        this.addKeyEdit(dataLoad.data.listTodo);
      }
    }
  }

  addKeyEdit = (array) => {
    this.setState({
      todos: array.map((element) => {
        element.isEdit = false;
        return element;
      }),
    })
  }

  handleError = (content) => {
    toast.error(`${content}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClick: () => {window.location.reload()},
    });
  }

  htmlStrip = (data) => {
    return data.replace(/<[^>]*>/gi, "");
  }

  handleGetApi = async (email) => {
    const { response, data } = await client.get(`/api-key?email=${email}`);
    this.setState({ loading: false });

    if (response.ok) {
      localStorage.setItem("api_key", JSON.stringify(data.data.apiKey));
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
      this.setState({
        todos: dataLoad.data.listTodo,
      });
      this.addKeyEdit(dataLoad.data.listTodo);
    }
    else {
      this.handleError("Failed get data, click to reload!");
    }
  }

  addTodo = async () => {
    this.setState({ loading: true });
    const { data: dataLoad } = await client.get("/todos");
    this.setState({ loading: false });
    this.addKeyEdit(dataLoad.data.listTodo);
  }

  handleDelete = (deleteId) => {
    const catchTodo = this.state.todos.find(({ _id }) => {
      return _id === deleteId;
    });

    const handleClick = async () => {
      this.setState({ loading: true });
      const { response } = await client.delete(`/todos/${catchTodo._id}`);
      this.setState({ loading: false });
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
        this.handleError("Failed delete, click to reload!");
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
    this.setState({ loading: true });
    const { response } = await client.patch(`/todos/${id}`, {todo, isCompleted});
    this.setState({ loading: false });

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
      this.handleError("Failed update, click to reload");
    }
  }

  render() {  
    return (
      <div className='todo-wrap'>
        <h2>Welcome to Todo App!</h2>
        <TodoForm addTodo={this.addTodo} handleApi={this.handleApi} htmlStrip={this.htmlStrip} handleError={this.handleError}/>

        {
          this.state.todos.map((element, index) => {
            return element.isEdit ? 
            <TodoFormEdit key={index} todo={element} handleDelete={this.handleDelete} editTodo={this.editTodo} handleUpdate={this.handleUpdate}  htmlStrip={this.htmlStrip} handleError={this.handleError}/> :
            <Todo key={index} todo={element} handleDelete={this.handleDelete} editTodo={this.editTodo} />
          })
        }
        
        <ToastContainer />
        {
          this.state.loading && (
            <div className='spinner-loading'>
              <PuffLoader loading={this.state.loading} size={150} color="#36d7b7" />
            </div>
          )
        }
      </div>
    )
  }
}