import React from 'react'

export default function ShopProduct({ image, name, price }) {
  return (
    <div className='product'>
      <img src={image} alt="Ảnh sản phẩm" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price} $</p>
      <button className="btn-add">Add to cart!</button>
    </div>
  )
}