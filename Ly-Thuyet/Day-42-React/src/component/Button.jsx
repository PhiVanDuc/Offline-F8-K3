import React, { forwardRef } from 'react'

function Button(props, ref) {
  return (
    <button ref={ref.buttonRef}>Click me!</button>
  )
}

export default forwardRef(Button);