import React, { useContext } from 'react'
import { MyContext } from '../App'

export default function ToggleTheme() {
    const data = useContext(MyContext);

    return (
        <div>
            <button onClick={data.handleToggleTheme}>Toggle Theme</button>
        </div>
    )
}
