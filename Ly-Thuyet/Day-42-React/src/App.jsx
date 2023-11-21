import React, { createContext } from 'react'
import Counter from './component/Counter'
import Control from './component/image/Control';
// import HelloWord from './component/HelloWord';

export const MyContext = createContext();

export default function App() {
  return (
    // <MyContext.Provider value={{ title: "Hello F8" }}>
    //   <HelloWord />
    // </MyContext.Provider>
    // <Counter />
    <Control />
  )
}