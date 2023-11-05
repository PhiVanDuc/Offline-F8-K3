import React, { Component } from 'react'
import Todo from './Todo'

export default class TodoFormEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.todo.todo,
      isCompleted: this.props.todo.isCompleted,
    }
  }

  handleChangeInput = (e) => {
    this.setState({
      inputValue: this.props.htmlStrip(e.target.value),
    });
  }

  handleChangeBox = (e) => {
    this.setState({
      isCompleted: e.target.checked,
    });
  }

  render() {
    const { todo, handleDelete, editTodo, handleUpdate } = this.props;

    return (
      <form action="" className="todo-form-edit" onSubmit={(e) => {e.preventDefault() ;handleUpdate(todo._id, this.state.inputValue, this.state.isCompleted)}}>
        <input type="text" className={`input-edit${this.state.isCompleted ? " line" : ""}`} placeholder="Edit..." value={this.state.inputValue} onChange={this.handleChangeInput} />

        <div className="control">
          <div className="is-complete">
            <label>
              {
                this.state.isCompleted ? "Completed" : "Not Completed"
              }
            </label>
            <input type="checkbox" className="checkbox-complete" onChange={this.handleChangeBox} checked={this.state.isCompleted}/>
          </div>
          
          <div className="button-group">
            <button type="button" className="button-escape" onClick={() => { editTodo(todo._id) }}>Thoát</button>
            <button className="button-update">Update</button>
            <button type="button" className="button-delete" onClick={() => { handleDelete(todo._id) }}>Xóa</button>
          </div>
        </div>
      </form>
    )
  }
}