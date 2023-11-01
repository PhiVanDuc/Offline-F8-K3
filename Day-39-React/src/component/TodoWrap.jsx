import React, { Component } from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import {v4 as uuidv4} from 'uuid'
import { client } from '../api/client'

export default class TodoWrap extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
    }
  }

  componentDidMount() {
    this.handleApi();
    console.log("hehe");
  }

  handleApi = async () => {
    const { data } = await client.get(`/api-key?email=phivanduc325@gmail.com`);
    client.setApiKey(data.data.apiKey);
  }

  addTodo = (nameTask) => {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: uuidv4(),
          nameTask: nameTask,
          isComplete: false,
          isEditing: false,
        }
      ]
    });
  }

  handleDelete = (deleteId) => {
    const newTodos = this.state.todos.filter(({ id }) => {
      return id !== deleteId;
    });

    this.setState({
      todos: newTodos,
    });
  }

  render() {
    return (
      <div className='todo-wrap'>
        <h2>Welcome to Todo App!</h2>
        <TodoForm addTodo={this.addTodo}/>

        {
          this.state.todos.map((element, index) => {
            return <Todo key={index} todo={element} handleDelete={this.handleDelete}/>
          })
        }
      </div>
    )
  }
}
