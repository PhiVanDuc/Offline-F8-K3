import React, { memo } from 'react'

function Historise({ history, total, updateHistory }) {
    console.log("History render");

    const handleClick = () => {
        updateHistory();
    }

    return (
        <div>
            <h2>Lịch sử nạp tiền</h2>
                {
                    history.map((item, index) => {
                        return <h3 key={index}>{item.amount.toLocaleString()} - {item.createAt}</h3>
                    })
                }
            <h2>Total: {total.toLocaleString()}</h2>
            <button onClick={handleClick}>Xóa lịch sử</button>
        </div>
    )
}

export default memo(Historise);