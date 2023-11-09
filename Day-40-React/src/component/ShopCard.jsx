import React, { useContext } from 'react'
import client from '../api/client';
import displayNotify from '../utilities/displayNotify';
import { ShopContext } from './Shop'

export default function ShopCard() {
  const { cart, handleUpdateCart, handleApi, handleUpdateLoading } = useContext(ShopContext);
  const handlePay = async () => {
    handleUpdateLoading(true);
    const { response } = await client.post("/orders", cart);
    handleUpdateLoading(false);
    
    if (!response.ok) {
      handleApi();
    }
    else {
      displayNotify("success", "Đã thanh toán!");
      localStorage.removeItem("carts");
      handleUpdateCart([]);
    }
  }

  return (
    <div className='shop-cart'>
      <table>
        <thead>
            <tr>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Còn lại</th>
                <th>Tổng tiền</th>
            </tr>
        </thead>

        <tbody>
          {
            cart.map(({ name, quantity, left, total }, index) => {
              return (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{left}</td>
                  <td>{total}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <button className="btn-pay" onClick={handlePay}>Thanh toán</button>
    </div>
  )
}