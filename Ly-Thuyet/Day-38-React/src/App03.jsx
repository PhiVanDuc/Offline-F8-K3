// Trong class Component chứa các thành phần của React
/*
    State
    Lifecycle

    State là gì? -> Trạng thái
    Nếu muốn thay đổi dữ liệu của một component -> Dùng state
    State chỉ có thể sử dụng nội bộ trong một component
    Khi state thay đổi -> Component sẽ chạy lại hàm render
    Không được thay đổi trực tiếp biến state -> Thông qua hàm riêng để thay đổi
*/

import React, { Component } from 'react'

export default class App03 extends Component {
    constructor(props) {
        super();

        // Khai báo state
        this.state = {
            count: 0,
        };
    }

    handleIncrement = () => {
        // Để thay đổi state => Dùng hàm setState
        this.setState({
            count: this.state.count + 1,
        });
    }

    handleDecrement = () => {
        // Để thay đổi state => Dùng hàm setState
        this.setState({
            count: this.state.count - 1,
        });
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                {
                    this.state.count === 5 && <h1>Thành công</h1>
                }
                <button onClick={this.handleIncrement}>+</button>
                <button onClick={this.handleDecrement}>-</button>
            </div>
        )
    }
}