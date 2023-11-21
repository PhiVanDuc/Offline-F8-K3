import React from 'react'
import Input from './component/Input'

export default function App03() {
  return (
    <div>
        <Input name="Tên" type="text" />
        <Input name="Email" type="email" />
        <Input name="Điện thoại" type="number" />
    </div>
  )
}
