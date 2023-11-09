import React, { useContext } from 'react'
import ShopProduct from './ShopProduct';
import { ShopContext } from './Shop';

export default function ShopList() {
  const { products } = useContext(ShopContext);

  return (
    <div className='shop-products'>
      {
        products.map(({ image, name, price, quantity, _id }, index) => {
          return <ShopProduct
            image={image}
            name={name}
            price={price}
            key={index}
            quantity={quantity}
            _id={_id}
          />
        })
      }
    </div>
  )
}
