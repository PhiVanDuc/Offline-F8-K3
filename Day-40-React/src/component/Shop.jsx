import React, { createContext, useEffect, useRef, useState } from 'react'
import client from '../api/client'
import Login from './Login';
import ShopList from './ShopList'
import ShopCard from './ShopCard'
import displayNotify from '../utilities/displayNotify'
import { ToastContainer } from 'react-toastify';
import PuffLoader from 'react-spinners/Puffloader'

export const ShopContext = createContext();

export default function Shop() {
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [cart, setCart] = useState(() => {
    if (localStorage.getItem("carts")) {
      let saveCarts = localStorage.getItem("carts");
      saveCarts = JSON.parse(saveCarts);
      return saveCarts;
    }
    else return [];
  });
  const [loading, setLoading] = useState(false);

  const handleUpdateEmail = (value) => {
    setEmail(value);
  }

  const handleUpdateCart = (array) => {
    setCart(array)
  }

  const handleUpdateLoading = (boolean) => {
    setLoading(boolean);
  }

  useEffect(() => {    
    handleApi();
  }, []);

  const handleApi = async () => {
    if (!localStorage.getItem("apiKey")) {
      setLoading(true);
      const { response, data } = await client.get(`/api-key?email=${email}`);
      setLoading(false);
          
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
      setLoading(true);
      const apiKey = localStorage.getItem("apiKey");
      client.setApiKey(JSON.parse(apiKey));
      const { response, data } = await client.get("/products?limit=8");
      const { response: responseProfile, data: dataPofile } = await client.get("/users/profile");
      setLoading(false);

      if (response.ok && responseProfile.ok) {
        setShowLogin(false);
        setProducts(data.data);
        displayNotify("success", `Chào mừng ${dataPofile.data.emailId.name}`);
      }
      else {
        localStorage.removeItem("apiKey");
        displayNotify("error", "Vui lòng đăng nhập!");
        setShowLogin(true);
      }
    }
  }

  console.log(cart);

  const data = {
    email,
    showLogin,
    products,
    cart,
    handleApi,
    handleUpdateEmail,
    handleUpdateCart,
    handleUpdateLoading,
  }

  return (
    <ShopContext.Provider value={data}>
      <div className='shop'>
        {
          showLogin && <Login />
        }
        <h2 className='shop-heading'>Welcome to Shop!</h2>
        <ShopList />
        {
          cart.length > 0 && <ShopCard />
        }
        <ToastContainer />
        {
          loading && (
            <div className='spinner-loading'>
              <PuffLoader loading={loading} size={150} color="#36d7b7" />
            </div>
          )
        }
      </div>
    </ShopContext.Provider>
  )
}