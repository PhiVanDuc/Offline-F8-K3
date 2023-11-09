import React, { createContext, useEffect, useRef, useState } from 'react'
import client from '../api/client'
import Login from './Login';
import ShopList from './ShopList'
import ShopCard from './ShopCard'
import displayNotify from '../utilities/displayNotify'
import { ToastContainer } from 'react-toastify';

export const ShopContext = createContext();

export default function Shop() {
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(true);

  const handleUpdateEmail = (value) => {
    setEmail(value);
  }

  let mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    
    handleApi();
  }, []);

  const handleApi = async () => {
    if (!localStorage.getItem("apiKey")) {
      const { response, data } = await client.get(`/api-key?email=${email}`);
          
      if (response.ok) {
          client.setApiKey(data.data.apiKey);
          const { data: dataProducts } = await client.get("/products?limit=8");
          localStorage.setItem("apiKey", JSON.stringify(data.data.apiKey));
          setShowLogin(false);
          setProducts(dataProducts.data);

          const { data: dataPofile } = await client.get("/users/profile");
          displayNotify("success", `Chào mừng ${dataPofile.data.emailId.name}`);
      }
    }
    else {
      const apiKey = localStorage.getItem("apiKey");
      client.setApiKey(JSON.parse(apiKey));
      const { response, data } = await client.get("/products?limit=8");
      const { response: responseProfile, data: dataPofile } = await client.get("/users/profile");

      if (response.ok && responseProfile.ok) {
        setShowLogin(false);
        setProducts(data.data);
        displayNotify("success", `Chào mừng ${dataPofile.data.emailId.name}`);
      }
      else {
        setShowLogin(true);
        displayNotify("error", "Vui lòng đăng nhập!");
        localStorage.removeItem("apiKey");
      }
    }
  }

  const data = {
    email,
    showLogin,
    products,
    handleApi,
    handleUpdateEmail,
  }

  return (
    <ShopContext.Provider value={data}>
      <div className='shop'>
        {
          showLogin && <Login />
        }
        <h2 className='shop-heading'>Welcome to Shop!</h2>
        <ShopList />
        <ToastContainer />
      </div>
    </ShopContext.Provider>
  )
}