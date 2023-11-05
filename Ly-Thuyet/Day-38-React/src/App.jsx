// Component: Hàm hoặc class được return về React Element (hoặc JSX), viết hóa kí tự đầu
// Có thể gọi Component như một hàm
// Có thể gọi Component giống như một thẻ html

// Có 2 loại component trong React
// 1. Functional
// 2. Class

// Từ JSX chuyển sang React Element thông qua React DOM để chuyển sang HTML

// JSX cũng có thể chuyển những kiểu khác thông qua babel
import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';

export default function App() {
    const title  = "Học React rất dễ lú!";
    const status = true;
    const handleClick = (e) => {
        console.log(e);
    }
    const handleClick2 = (text) => {
        console.log(text);
    }
    const isLogin = true;
    const users = [
        {
            id: 1,
            name: "User 1"
        },
        {
            id: 2,
            name: "User 2"
        },
        {
            id: 3,
            name: "User 3"
        }
    ]

    return (
        <div className="content" id="content">
            <Header />
            {
                isLogin && <h2>Chào mừng bạn đã quay trở lại</h2>
            }
            <h2 className={`title${status && " success"}`}>{title}</h2>
            {
                users.map(({id, name}) => <h3 key={id}>Name: {name}</h3>)
            }
            <button onClick={handleClick}>Click me</button>
            <button onClick={() => {handleClick2("Log ra text")}}>Click me 2</button>
            <Footer />
        </div>
    );
}