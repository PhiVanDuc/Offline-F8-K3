import React, { createContext, useState } from 'react'
import ShowCounter from './component/ShowCounter';
import ToggleTheme from './component/ToggleTheme';
import Vnd from './component/Vnd';
import Usd from './component/Usd';

// 1. Đối tượng context => createContext
export const MyContext = createContext();

export default function App() {
  // const step1 = 10;
  // const step2 = 5;
  // const [theme, setTheme] = useState("light");

  // const handleToggleTheme = () => {
  //   setTheme(theme === "light" ? "dark" : "light");
  // }

  // const data = {
  //   step: 10,
  //   theme,
  //   handleToggleTheme,
  // }

  const [state, setState] = useState({
    vnd: 0,
    usd: 0
  });

  const handleDispatch = (value) => {
    let vnd, usd;

    if (value.type === "vnd") {
      // Chuyển đổi tỷ giá từ vnd -> usd
      vnd = value.payload;
      usd = (vnd / 24500).toFixed(6);
    }
    else {
      usd = value.payload;
      vnd = usd * 24500
    }

    setState({
      vnd,
      usd,
    })
  }

  return (
    // 2. Provider => Gửi dữ liệu
    <MyContext.Provider value={{state, dispatch: handleDispatch}}>
      {/* <ToggleTheme />
      <ShowCounter/> */}

      <Vnd />
      <Usd />
    </MyContext.Provider>
  )
}


// Context
// 1. Đối tượng context => createContext
// 2. Provider => Gửi dữ liệu
// 3. Consumer => Nhận dữ liệu (useContext) 
// App => ShowCounter => Counter