import React, { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProducts, fetchTotalPage } from './redux/slices/productsSlice'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Products from './pages/Products'
import DetailProduct from './pages/DetailProduct'

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let param = 1;

  const updatePageNumber = (pageNumber) => {
    param = pageNumber;
  }

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === '/') navigate(`/products/1`);
    else navigate(`/products/${param}`);
    dispatch(fetchProducts(param, 20));
  }, [param]);

  useEffect(() => {
    dispatch(fetchTotalPage());
  }, [])

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/products/:pageNumber' element={<Products updatePageNumber={updatePageNumber} />}/>
        <Route path='/detail-product/:detail' element={<DetailProduct />} />
      </Routes>
    </div>
  )
}