import React, { Component } from 'react'

export default class TodoFormEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form action="" className="todo-form-edit">
        <input type="text" className="input-edit" placeholder="Edit..." />
        <div className="control">
          <div className="is-complete">
            <label>Not completed</label>
            <input type="checkbox" className="checkbox-complete" />
          </div>
          <div className="button-group">
            <button className="button-escape">Thoát</button>
            <button className="button-update">Update</button>
            <button className="button-delete">Xóa</button>
          </div>
        </div>
      </form>
    )
  }
}