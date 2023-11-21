import React, { useId } from 'react'

export default function Input({ name, type="text" }) {
    const id = useId();

  return (
    <div>
        <label htmlFor={id}>{name}</label>
        <input type={type} placeholder={name} id={id}/>
    </div>
  )
}