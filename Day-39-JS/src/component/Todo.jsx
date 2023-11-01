import React, { Component } from 'react'

export default class Todo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="todo">
        <p className={`name-task${this.props.todo.isCompleted ? " completed" : ""}`}>{this.props.todo.todo}</p>
        <div className="control">
          <button className="button-edit" onClick={() => {this.props.editTodo(this.props.todo._id)}}>Sửa</button>
          <button className="button-delete" onClick={() => {this.props.handleDelete(this.props.todo._id)}}>Xóa</button>
        </div>
      </div>
    )
  }
}