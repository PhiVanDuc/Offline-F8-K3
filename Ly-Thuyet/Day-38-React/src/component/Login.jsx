import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: "",
                email: "",
            },
            error: "",
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, email} = this.state.form;
    }

    handleChangeValue = (e) => {
        // Update dữ liệu nhận được vào state.form
        this.setState({
            form: {...this.state.form, [e.target.name]: e.target.value},
        });
    }

    render() {
        return (
            <div>
                <form action="">
                    <div>
                        <label htmlFor="">Tên:</label>
                        <input onChange={this.handleChangeValue} type="text" name="name" placeholder='Tên...'/>
                    </div>

                    <div>
                        <label htmlFor="">Email:</label>
                        <input onChange={this.handleChangeValue} type="text" name="email" placeholder='Email...'/>
                    </div>

                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}
