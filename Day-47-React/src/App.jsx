import React, { createContext, useState, useEffect } from 'react'
import { client } from './utilities/client';
import Login from './pages/Login'
import Trello from './pages/Trello'
import { notify } from './utilities/notify';
import { ToastContainer } from 'react-toastify';

export const RootContext = createContext();

export default function App() {
    const [successLogin, setSuccessLogin] = useState(false);

    const changeSuccessLogin = (boolean) => {
        setSuccessLogin(boolean)
    }

    useEffect(() => {
        if (successLogin) {
            notify("success", "Đăng nhập thành công!");
            return;
        }

        const checkSuccess = async () => {
            if (localStorage.getItem("apiKey")) {
                client.setApiKey(JSON.parse(localStorage.getItem("apiKey")));
                const { response } = await client.get("/tasks");
    
                if (response.ok) {
                    changeSuccessLogin(true);
                }
                else {
                    notify("error", "Vui lòng đăng nhập lại");
                    localStorage.removeItem("apiKey");
                    changeSuccessLogin(false);
                }
            }
        }
        checkSuccess();
    }, [successLogin]);

    const dataContext = {
        changeSuccessLogin: changeSuccessLogin,
    }

    return (
        <RootContext.Provider value={dataContext}>
            <div className='app'>
                { !successLogin && <Login /> }
                {
                    successLogin && <Trello />
                }
            </div>
            <ToastContainer />
        </RootContext.Provider>
    )
}