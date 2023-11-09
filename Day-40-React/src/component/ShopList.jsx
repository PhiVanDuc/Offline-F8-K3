import React, { useContext } from 'react'
import ShopProduct from './ShopProduct';
import { ShopContext } from './Shop';

export default function ShopList() {
  const { products } = useContext(ShopContext);

  return (
    <div className='shop-products'>
      {
        products.map(({ image, name, price }, index) => {
          return <ShopProduct image={image} name={name} price={price} key={index}/>
        })
      }
    </div>
  )
}
