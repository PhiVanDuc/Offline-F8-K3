import React, { Component } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo">
        <p className="name-task">{this.props.todo.todo}</p>
        <div className="control">
          <button className="button-edit">Sửa</button>
          <button className="button-delete" onClick={() => {this.props.handleDelete(this.props.todo._id)}}>Xóa</button>
        </div>
      </div>
    )
  }
}