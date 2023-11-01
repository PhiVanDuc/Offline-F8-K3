import React, { Component } from 'react'
import TodoWrap from './component/TodoWrap'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <TodoWrap />
      </div>
    )
  }
}