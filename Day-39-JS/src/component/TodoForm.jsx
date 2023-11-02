import React, { Component } from 'react'
import { client } from '../api/client';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTask: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      nameTask: this.props.htmlStrip(e.target.value),
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { response } = await client.post('/todos', {todo: this.state.nameTask});
    if (response.ok) {
      this.props.addTodo(this.state.nameTask);
      this.setState({ nameTask: "" });

      toast.success('Success add todo!', {
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
      this.props.handleError("Failed add, click to reload!");
    }
  }

  render() {
    return (
      <form action="" className="todo-form" onSubmit={this.handleSubmit}>
        <input value={this.state.nameTask} onChange={this.handleChange} type="text" className="input-add" placeholder="Thêm một việc làm mới" />
        <button className="button-add">Thêm mới</button>
      </form>
    )
  }
}