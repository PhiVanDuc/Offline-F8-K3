import React, { useState, startTransition, useTransition } from 'react'
import students from './db.json'

export default function Students() {
    const [keyword, setKeyword] = useState("");
    const [pending, handleTranslate] = useTransition();

    const handleSearch = (e) => {
        handleTranslate(() => {
            setKeyword(e.target.value);
        })
    }

    return (
        <div>
            <input type="search" placeholder='Từ khóa...' onChange={handleSearch} />
            <h3>Danh sách sinh viên</h3>
            {
                pending && <h3>Loading...</h3>
            }
            {
                students.map(({ id, fullName }) => {
                    const position = fullName.toLowerCase().indexOf(keyword.toLowerCase());

                    if (keyword.length && position !== -1) {
                        return (
                            <h4 key={id}>
                                {fullName.slice(0, position)}
                                <span style={{ backgroundColor: "yellow" }}>
                                    {fullName.slice(position, position + keyword.length)}
                                </span>
                                {fullName.slice(position + keyword.length)}
                            </h4>
                        )
                    }

                    return <h4 key={id}>{fullName}</h4>
                })
            }
        </div>
    )
}