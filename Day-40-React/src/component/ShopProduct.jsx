import React, { useContext } from 'react'
import { ShopContext } from './Shop'

export default function ShopProduct({ image, name, price, quantity, _id }) {
  const { cart, handleUpdateCart } = useContext(ShopContext);
  const handleClickAdd = () => {
    let check = false;
    const info = {
      productId: _id,
      name,
      quantity: 1,
      left: quantity,
      total: price,
    }

    if (cart.length > 0) {
      cart.forEach((obj) => {
        if (info.productId === obj.productId) {
          obj.quantity += info.quantity;
          obj.left--;
          obj.total += info.total;
          check = true;
          handleUpdateCart([...cart]);
          localStorage.setItem("carts", JSON.stringify(...cart));
          return;
        }
      });

      if (check) return;
      else if (!check) {
        handleUpdateCart([
          ...cart,
          info,
        ]);
        localStorage.setItem("carts", JSON.stringify([...cart, info]));
      }
    }
    else {
      handleUpdateCart([info]);
      localStorage.setItem("carts", JSON.stringify([info]));
    }
  }

  return (
    <div className='product'>
      <img src={image} alt="Ảnh sản phẩm" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">Giá: {price} $</p>
      <button className="btn-add" onClick={handleClickAdd}>Add to cart!</button>
    </div>
  )
}