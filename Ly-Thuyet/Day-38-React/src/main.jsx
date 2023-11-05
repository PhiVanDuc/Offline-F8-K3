import React from 'react'
import ReactDOM from 'react-dom/client'


// React Render giao diện - Thông qua thư viện React DOM
const rootElement = document.querySelector("#root");


// Tạo element từ thư viện React
// const h1 = React.createElement("h1", {
//   className: "title",
// }, "Học React không khó!");

// const h2 = React.createElement("h2", {
//   onClick: (e) => {
//     console.log("Hello F8");
//     e.target.style.color = 'red';
//   }
// }, React.createElement("span", {}, "Học React thật dễ!"));

// const li = [...Array(10).keys()].map((index) => React.createElement("li", {}, `Item ${index + 1}`));

// const ul = React.createElement("ul", {
//     className: "menu",
// }, ...li);

// const div = React.createElement("div", {
//   className: "content",
//   id: "content",
//   "data-index": "123"
// }, h1, h2, ul);

import App from "./App";
import App02 from "./App02";
import App03 from "./App03";
import App04 from "./App04";

// Render lên UI
ReactDOM.createRoot(rootElement).render(<App04 />);