import React, { Component } from 'react'

export default class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameTask: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      nameTask: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.nameTask);
    this.setState({
      nameTask: "",
    });
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
