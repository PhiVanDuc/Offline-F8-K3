import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    return (
        <header className='header'>
            <div className="container">
                <Link to={"/products"}>
                    <p className='logo'>Logo</p>
                </Link>
                
                <div className="wrap-cart">
                    <div className="icon-cart">
                        <FontAwesomeIcon icon={faBagShopping} />
                    </div>
                    <p className='quantity'>0</p>
                </div>
            </div>
        </header>
    )
}
