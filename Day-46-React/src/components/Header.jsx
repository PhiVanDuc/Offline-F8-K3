import React, { useDebugValue } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/slices/productsSlice'

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => state.carts.carts);
    
    const handleClickLogo = () => {
        dispatch(fetchProducts({param: 1, limit: 20}));
    }

    const handleClickCart = () => {
        navigate("/cart");
    }

    return (
        <header className='header'>
            <div className="container">
                <Link to={"/products/1"} onClick={handleClickLogo}>
                    <p className='logo'>Logo</p>
                </Link>
                
                <div className="wrap-cart">
                    <div className="icon-cart" onClick={handleClickCart}>
                        <FontAwesomeIcon icon={faBagShopping} />
                    </div>
                    <p className='quantity'>{
                        carts.reduce((prev, { quantity }) => {
                            return prev + quantity;
                        }, 0)
                    }</p>
                </div>
            </div>
        </header>
    )
}
