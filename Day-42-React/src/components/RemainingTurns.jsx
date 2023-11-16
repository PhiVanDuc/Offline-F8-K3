import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RootContext } from './GuessNumber'

export default function RemainingTurns() {
    const data = useContext(RootContext);
    const { valueRange } = data;

    const [maxTime, setMaxTime] = useState(Math.ceil(Math.log2(+valueRange)));
    const [leftTime, setLeftTime] = useState(Math.ceil(Math.log2(+valueRange)));

    useLayoutEffect(() => {
        setMaxTime(Math.ceil(Math.log2(+valueRange)));
        setLeftTime(Math.ceil(Math.log2(+valueRange)));
    }, [valueRange]);

    return (
        <div className='remaining-turns'>
            <h1>Chào mừng bạn đến với trò chơi đoán số!</h1>
            <h2>Còn {leftTime}/{maxTime} lần</h2>
        </div>
    )
}