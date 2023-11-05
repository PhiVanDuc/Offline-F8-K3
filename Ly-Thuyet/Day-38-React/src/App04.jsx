// Call API -> Render UI


import React, { Component } from 'react'
import Counter from './component/Counter'
import Login from './component/Login';

export default class App04 extends Component {
    constructor() {
        super();
        this.state = {
            isShow: false,
            todo: [],
        }
    }

    // getTodo = async () => {
    //     const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    //     const data = await response.json();

    //     this.setState({
    //         todo: data
    //     });
    // }

    // componentDidMount() {
    //     this.getTodo();
    // }

    render() {
        // const { todo } = this.state;

        return (
            <div>
                <Login></Login>
                {/* {
                    this.state.isShow && <Counter />
                }
                <button onClick={() => {
                    this.setState({
                        isShow: !this.state.isShow,
                    })
                }}>Toggle</button>

                {
                    todo.map(({id, title}) => {
                        return (
                            <div key={id}>
                                <p>Id: {id}</p>
                                <p>Title: {title}</p>
                            </div>
                        )
                    })
                } */}
            </div>
        )
    }
}