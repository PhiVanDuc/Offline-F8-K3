import React, { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { fetchProducts, fetchTotalPage } from './redux/slices/productsSlice'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Products from './pages/Products'

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let param = 1;

  const updatePageNumber = (pageNumber) => {
    param = pageNumber;
  }

  useEffect(() => {
    navigate(`/products/${param}`);
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
      </Routes>
    </div>
  )
}