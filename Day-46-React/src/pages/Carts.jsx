import React from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';


export default function Carts() {
    const carts = useSelector((state) => state.carts.carts);

    return (
        <div className='cart'>
            <h2 className='cart-heading'>Shopping Cart</h2>
            
            <div className="cart-items">
                {
                    carts.map(({ brand, image, name, price, quantity }) => {
                        return (
                            <div className='cart-item'>
                                <div className="cart-item-header">
                                    <img className='cart-item-image' src={image} alt="Ảnh sản phẩm" />
                                    <div className="cart-item-info">
                                        <p className='cart-item-brand'>{ brand }</p>
                                        <h3 className='car-item-name'>{ name }</h3>
                                        <p className='cart-item-price'>{ price }</p>
                                        <p className='cart-item-quantity'>Còn lại: { quantity }</p>
                                    </div>
                                </div>
                                <div className="cart-item-footer">
                                    <div className="cart-item-input">
                                        <button>-</button>
                                        <p className='quantity'></p>
                                        <button>+</button>
                                    </div>
                                    <div className="cart-item-price">
                                        <p>$</p>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
