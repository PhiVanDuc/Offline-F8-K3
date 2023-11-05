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
        let email = localStorage.getItem("email");
        email = JSON.parse(email);
        const nameUser = email.match(/^(.*?)@/)[1];
        this.handleSuccess(`Chào mừng ${nameUser}!`);

        this.setState({
          todos: data.data.listTodo,
        });
        this.addKeyEdit(data.data.listTodo);
      }
    }
  }

  // Hàm để update lại todos đã search
  updateSearchTodos = async (nameTask) => {
    this.setState({ loading: true })
    const response = await client.get(`/todos?q=${nameTask}`);
    const data = response.data.data.listTodo;
    this.setState({ loading: false })

    this.setState({
      todos: data,
    })
  }

  // Add key là isEdit vào mỗi phần tử trong todos
  addKeyEdit = (array) => {
    this.setState({
      todos: array.map((element) => {
        element.isEdit = false;
        return element;
      }),
    })
  }

  // Hàm để dùng lại thông báo lỗi
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

  // Hàm để dùng lại thông báo thành công
  handleSuccess = (content) => {
    toast.success(`${content}`, {
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

  // Hàm loại bỏ html trong thanh input
  htmlStrip = (data) => {
    return data.replace(/<[^>]*>/gi, "");
  }

  // Hàm lấy dữ liệu dựa vào email và trả về các task todo
  handleGetApi = async (email) => {
    const { response, data } = await client.get(`/api-key?email=${email}`);
    this.setState({ loading: false });

    if (response.ok) {
      localStorage.setItem("api_key", JSON.stringify(data.data.apiKey));
      localStorage.setItem("email", JSON.stringify(email))
      client.setApiKey(data.data.apiKey);

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

  // Hàm gọi API để lấy todos và update lại todos
  addTodo = async () => {
    this.setState({ loading: true });
    const { data: dataLoad } = await client.get("/todos");
    this.setState({ loading: false });
    this.addKeyEdit(dataLoad.data.listTodo);
  }

  // Hàm xóa task và cập nhập lại ở trên API
  handleDelete = (deleteId) => {
    const catchTodo = this.state.todos.find(({ _id }) => {
      return _id === deleteId;
    });

    const handleClick = async () => {
      this.setState({ loading: true });
      const { response } = await client.delete(`/todos/${catchTodo._id}`);
      this.setState({ loading: false });
      if (response.ok) {
        this.handleSuccess("Success delete todo!");

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

  // Hàm ẩn hiện form edit
  editTodo = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        return todo._id === id ? { ...todo, isEdit: !todo.isEdit } : todo;
      }),
    });
  } 

  handleUpdate = async (id, todo, isCompleted = false) => {
    this.setState({ loading: true });
    const { response, data } = await client.patch(`/todos/${id}`, {todo, isCompleted});
    this.setState({ loading: false });

    if (response.ok) {
      const todoUpdate = data.data;
      for (let i = 0; i < this.state.todos.length; i++) {
        if (this.state.todos[i]._id === todoUpdate._id) {
          const newTodos = this.state.todos.map((todo) => {
            if (todo._id === todoUpdate._id) {
              todo = {
                ...todo,
                ...todoUpdate,
                isEdit: false,
              }
            }
            return todo;
          })
          this.setState({
            todos: newTodos,
          })

          break;
        }
      }
      this.handleSuccess("Success update todo!");
    }
    else {
      this.handleError("Failed update, click to reload");
    }
  }

  render() {  
    return (
      <div className='todo-wrap'>
        <h2>Welcome to Todo App!</h2>
        <TodoForm addTodo={this.addTodo} htmlStrip={this.htmlStrip} handleError={this.handleError} handleSuccess={this.handleSuccess} updateSearchTodos={this.updateSearchTodos}/>

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