import React, { useContext, useState } from 'react'
import client from '../api/client'
import { ShopContext } from './Shop'
import displayNotify from '../utilities/displayNotify';

export default function Login() {
    const { email, handleApi, handleUpdateEmail } = useContext(ShopContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            displayNotify("error", "Invalid Email!");
            return;
        }
        
        handleApi();
    }

    return (
        <div className='wrap-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input 
                    type="text"
                    placeholder='example@example.com'
                    onChange={(e) => {handleUpdateEmail(e.target.value)}}
                />
                <button className='btn-submit'>Submit</button>
            </form>
        </div>
    )
}
