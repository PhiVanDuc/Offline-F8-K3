import React from 'react'

export default function Products({name, price, attrName, attrValue, onGetData}) {
    console.log(name, price, attrName, attrValue);
  return (
    <div>
        <h2>Products</h2>
        <button onClick={() => {onGetData("Hello F8")}}>Click me</button>
    </div>
  )
}