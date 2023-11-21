import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment/moment';
import Historise from './component/Historise';
import { useCallback } from 'react';

export default function App04() {
    const [amount, setAmount] = useState(0);
    const [history, setHistory] = useState([]);
    const handleChange = (e) => {
        setAmount(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setHistory([...history, { amount: +amount, createAt: moment().format("DD/MM/YYYY HH:mm:ss") }])
    }

    // useCallback(callback, deps)
    // Không cần return trong callback
    // Xử lý hàm không bị repeat thừa
    const updateHistory = useCallback(() => {
        setHistory([]);
    }, []);

    // useMemo -> Trả về một giá trị
    // Callback phải có return
    // Xử lý logic không bị repeat thừa
    const total = useMemo(() => {
        return history.reduce((prev, { amount }) => {
            return prev + amount;
        }, 0);
    }, [history]);

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                <input type="number" placeholder='Nhập số tiền...' onChange={handleChange} />
                <button>Add</button>
            </form>

            <Historise history={history} total={total} updateHistory={updateHistory} />
        </div>
    )
}


// Lưu ý:
// useCallback và useMemo không lạm dụng
// Làm sao để xử lý không cần phải dùng 2 hook này