import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        console.log("1. Constructor");
    }

    componentDidMount() {
        console.log("3. componentDidMount");
    }

    componentDidUpdate() {
        console.log("4. componentDidUpdate");
    }

    componentWillUnmount() {
        console.log("5. componentWillUnmount");
    }

    render() {
        console.log("2. Render")
        return (
            <div>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1,
                    });
                }}>Click</button>
            </div>
        )
    }
}
