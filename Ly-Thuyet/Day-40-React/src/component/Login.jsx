import React, { useEffect, useState } from 'react'

export default function Login() {
    const [form, setForm] = useState({email: "", password: ""});
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = form;
        setUsers([...users, {email, password}]);
    }

    useEffect(() => {
        console.log("Hello F8");
        return () => {
            console.log("Clean up");
        }
    }, [users]);

    // useEffect(() => {
    //     console.log("3. componentDidMount");
    //     return () => {
    //         console.log("4. componentWillUnmount");
    //     }
    // }, [])

    // Cứ re-render -> Sẽ chạy
    // useEffect(() => {
    //     console.log("2. Component Re-render");
    // })

    // Chỉ khi giá trị của các biến trong Array thay đổi thì mới chạy
    // useEffect(() => {
    //     console.log("Hello F8");
    // }, [form.email]);

    // const [todo, setTodo] = useState([]);
    // const getTodo = async () => {
    //     const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    //     const data = await response.json();
    //     setTodo(data);
    // }

    // useEffect(() => {
    //     getTodo();
    // }, []);

    console.log("Re-render");

    return (
        <div>
            {/* {
                todo.map(({id, title}) => {
                    return (
                        <h3 key={id}>{title}</h3>
                    )
                })
            } */}

            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Email</label>
                    <input onChange={handleChange} type="email" name="email" placeholder='Email...' />
                </div>

                <div>
                    <label htmlFor="">Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder='Password...' />
                </div>

                <button>Submit</button>
            </form>

            <hr />

            {
                users.map(({email, password}, index) => {
                    return (
                        <div key={index}>
                            <h2>{email}</h2>
                            <h2>{password}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}
