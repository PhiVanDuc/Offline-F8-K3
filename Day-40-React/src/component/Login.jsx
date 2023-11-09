import React, { useContext } from 'react'
import { ShopContext } from './Shop'
import displayNotify from '../utilities/displayNotify';

export default function Login() {
    const { email, updateEmail, updateLogin } = useContext(ShopContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            displayNotify("error", "Invalid Email!");
            return;
        }
        updateLogin(false);
    }

    return (
        <div className='wrap-form'>
            <form className='form-login' onSubmit={handleSubmit}>
                <label htmlFor="">Email</label>
                <input 
                    type="text"
                    placeholder='example@example.com'
                    onChange={(e) => {updateEmail(e.target.value)}}
                />
                <button className='btn-submit'>Submit</button>
            </form>
        </div>
    )
}
