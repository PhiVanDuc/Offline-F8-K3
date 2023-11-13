import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"

export default function LoginButton() {
    const { loginWithPopup, isLoading } = useAuth0();

    return (
        <>
            {
                !isLoading && (
                    <div className='instruct'>
                        <h1 className='instruct-heading'>Cảm ơn bạn đã sử dụng dịch vụ của F8</h1>
                        <p className='instruct-content'>Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt câu hỏi tại đây!</p>
                        <div className='btn-logout'>
                            <button onClick={() => loginWithPopup()}>ĐĂNG NHẬP || ĐĂNG KÝ</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
