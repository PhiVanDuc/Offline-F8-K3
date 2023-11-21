import React, {useContext} from 'react'
import { MyContext } from '../App'

export default function Usd() {
    const data = useContext(MyContext);

    return (
        <div>
            Usd: <input type="number" placeholder='Usd...' defaultValue={data.usd} onInput={(e) => {data.dispatch({ type: "usd", payload: e.target.value })}}/>
        </div>
    )
}