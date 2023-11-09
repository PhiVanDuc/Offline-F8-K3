import React, { createContext, useEffect, useRef, useState } from 'react'
import client from '../api/client'
import Login from './Login';
import ShopList from './ShopList'
import ShopCard from './ShopCard'
import displayNotify from '../utilities/displayNotify'
import { ToastContainer } from 'react-toastify';

export const ShopContext = createContext();

export default function Shop() {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);

  const updateEmail = (text) => {
    setEmail(text);
  }

  const updateLogin = (boolen) => {
    setLogin(boolen);
  }

  const mounted = useRef(true);
  useEffect(() => {

    if (!localStorage.getItem("apiKey")) {
      (
        async () => {
          const { response, data } = await client.get(`/api-key?email=${email}`);

          if (response.ok) {
            client.setApiKey(data.data.apiKey);
            localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
            
            const { data: dataProducts } = await client.get(`/products?limit=8`);
            setProducts(dataProducts.data);
            const { data: dataProfile } = await client.get("/users/profile");
            displayNotify("success", `Chào mừng ${dataProfile.data.emailId.name}!`)
          }
        }  
      )()
    }
    else {
      const apiKey = localStorage.getItem("apiKey");
      client.setApiKey(JSON.parse(apiKey));

      (
        async () => {
          const { response, data } = await client.get(`/products?limit=8`);
          const { response: responseProfile, data: dataProfile } = await client.get("/users/profile");

          if (response.ok && responseProfile.ok) {
            if (login === true) {
              setLogin(false);
              return;
            }

            setProducts(data.data);
            displayNotify("success", `Chào mừng ${dataProfile.data.emailId.name}!`);
          }
          else {
            if (mounted.current) {
              mounted.current = false;
              return;
            }
            
            localStorage.removeItem("apiKey");
            displayNotify("error", `Vui lòng đăng nhập!`);
            setLogin(true);
          }
        }
      )();
    }
  }, [login]);

  const data = {
    email,
    products,
    updateEmail,
    updateLogin,
  }

  return (
    <ShopContext.Provider value={data}>
      <div className='shop'>
        {
          login && <Login />
        }

        <h2 className='shop-heading'>Welcome to Shop!</h2>
        <ShopList />
        <ToastContainer />
      </div>
    </ShopContext.Provider>
  )
}