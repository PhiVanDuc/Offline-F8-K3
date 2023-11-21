import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { RootContext } from './GuessNumber';

export default function RangeInput() {
  const inputElement = useRef();
  const isDrag = useRef(false);
  const rangeNumberElement = useRef();
  const timeLine = useRef([100, 512, 1024, 1536, 2048]);
  const [percent, setPercent] = useState(0);

  const data = useContext(RootContext);
  const { valueRange, updateValueRange } = data;

  const handleChangeInputRange = (e) => {
    updateValueRange(e.target.value);
  }

  const handleDrag = (value) => {
    if (valueRange <= 5) {
      return 0;
    }
    else if (valueRange >= 2048) {
      return 2048
    }
    else {
      return (value / inputElement.current.clientWidth) * 100;
    }
  }

  useLayoutEffect(() => {
    rangeNumberElement.current.style.left =  ((valueRange - 5) / (2048 - 5)) * 100 + "%";
  }, []);

  const handleMouseDownInput = (e) => {
    isDrag.current = true;
    setPercent(handleDrag(e.nativeEvent.offsetX));
  }

  const handleMouseMoveInput = (e) => {
    if (isDrag.current) {
      setPercent(handleDrag(e.nativeEvent.offsetX));
    }
  }

  const handleMouseUpInput = () => {
    isDrag.current = false;
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();

    
  }

  const handleChangeInput = (e) => {
    const inputValue = e.target.value;
    const numberOnly = inputValue.replace(/\D/g, '');
    const limitedNumber = Math.min(parseInt(numberOnly), valueRange);
    if (!limitedNumber) e.target.value = "";
    else e.target.value = limitedNumber;
  }

  return (
    <div className='range-input'>
      <h2>Bạn cần tìm kiếm một số từ 1 đến {valueRange}</h2>

      <div className="range-slider">
        <input ref={inputElement} type="range" min="5" max="2048" value={valueRange} step="1" onChange={handleChangeInputRange} onMouseDown={handleMouseDownInput} onMouseMove={handleMouseMoveInput} onMouseUp={handleMouseUpInput} />
        <span ref={rangeNumberElement} className="range-number" style={
          valueRange <= 5 ? { left: 0, right: "auto" } : valueRange >= 2048 ? { right: 0, left: "auto" } : { left: percent + "%", right: "auto" }
        }>{valueRange}</span>

        {
          timeLine.current.map((time, index) => {
            if (index === timeLine.current.length - 1) {
              return <span key={index} className='timeline' style={{ right: 0 }}>{time}</span>
            }
            return <span key={index} className='timeline' style={{ left: ((time - 5) / (2048 - 5)) * 100 + "%" }}>{time}</span>
          })
        }
      </div>

      <form onSubmit={handleSubmitForm}>
        <label htmlFor="input-guess-number">Hãy thử nhập một số</label>
        <input type="text" placeholder={"Thử một số"} className='input-guess-number' id='input-guess-number' onChange={handleChangeInput} />
      </form>
    </div>
  )
}