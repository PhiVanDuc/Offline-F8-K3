import React, { createContext, useState, useRef } from 'react'
import ProgressBar from './ProgressBar'
import RemainingTurns from './RemainingTurns'
import ToggleTheme from './ToggleTheme'
import RangeInput from './RangeInput'
import TablesData from './TablesData'

export const RootContext = createContext();

export default function GuessNumber() {
    const [valueRange, setValueRange] = useState(99);
    const randomNumber = useRef(Math.floor(Math.random() * valueRange) + 1);

    const updateValueRange = (value) => {
        setValueRange(value);
    }

    const data = {
        valueRange,
        randomNumber,
        updateValueRange,
    }

    return (
        <RootContext.Provider value={data}>
            <div className='guess-number'>
                <ProgressBar />
                <div className='wrap-heading'>
                    <RemainingTurns/>
                    <ToggleTheme />
                </div>
                <RangeInput/>
                <TablesData />
            </div>
        </RootContext.Provider>
    )
}