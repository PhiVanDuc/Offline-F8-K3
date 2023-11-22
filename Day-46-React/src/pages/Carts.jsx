import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { cartsSlice } from '../redux/slices/cartsSlice';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../redux/slices/productsSlice';

const { increaseCarts, decreaseCarts, deleteItemCarts, clearCarts } = cartsSlice.actions;

export default function Carts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => state.carts.carts);

    const handleClickIncrease = (_id, amount) => {
        if (amount <= 0) console.log("Hết hàng");
        else dispatch(increaseCarts(_id));
    }

    const handleClickDecrease = (_id, quantity) => {
        if (quantity <= 1) console.log("Không thể giảm số lượng bé hơn 1!");
        else dispatch(decreaseCarts(_id));
    }

    const handleClickDelete = (_id) => {
        dispatch(deleteItemCarts(_id));
    }

    const handleClickReturn = () => {
        navigate("/products/1");
        dispatch(fetchProducts(1, 20));
    }

    const handleClickCheckout = () => {
        dispatch(clearCarts());
    }

    return (
        <div className='cart'>
            <div className="container">
                <h2 className='cart-heading'>Shopping Cart</h2>
                
                <div className="cart-items">
                    {
                        carts.map(({ _id, brand, image, name, price, quantity, amount }) => {
                            return (
                                <div className='cart-item' key={_id}>
                                    <div className="cart-item-header">
                                        <img className='cart-item-image' src={image} alt="Ảnh sản phẩm" />
                                        <div className="cart-item-info">
                                            <p className='cart-item-brand'>{ brand }</p>
                                            <h3 className='cart-item-name'>{ name }</h3>
                                            <p className='cart-item-price'><span>$ </span> { price }</p>
                                            <p className='cart-item-amount'><span>Còn lại: </span>{ amount }</p>
                                        </div>
                                    </div>
                                    <div className="cart-item-footer">
                                        <div className="cart-item-input">
                                            <button onClick={() => {handleClickDecrease(_id, quantity)}}>-</button>
                                            <p className='quantity'>{ quantity }</p>
                                            <button onClick={() => {handleClickIncrease(_id, amount)}}>+</button>
                                        </div>
                                        <div className="cart-item-total">
                                            <p><span>Total:</span><span>$ </span> {quantity * price}</p>
                                            <FontAwesomeIcon className='item-trash-bin' icon={faTrash} onClick={() => {handleClickDelete(_id)}}/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <h3 className="cart-total"><span>Total price: </span><span>$ </span>{ 
                        carts.reduce((acc, { quantity, price }) => acc + quantity * price, 0)
                    }</h3>
                </div>

                <div className="group-button">
                    <button className='btn-return' onClick={handleClickReturn}>Go home</button>
                    <button className='btn-checkout' onClick={handleClickCheckout}>Checkout</button>
                </div>
            </div>
        </div>
    )
}
