import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailProduct } from '../redux/slices/detailProductSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailProduct() {
    const { detail } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { brand, category, description, image, name, price } = useSelector((state) => state.detailProduct.detailProduct);

    useEffect(() => {
        dispatch(fetchDetailProduct(detail));
    }, []);

    const handleClickReturn = () => {
        navigate("/products/1");
        dispatch(fetchProducts(1, 20));
    }

    return (
        <div className='detail-product'>
            <div className="container">
                <div className="row">
                    <img className='img-product' src={ image } alt="Ảnh sản phẩm" />
                    <div className='detail-info'>
                        <div className="detail-header">
                            <div className="detail-heading">
                                <p className='brand-product'>{ brand }</p>
                                <h2 className='name-product'>{ name }</h2>
                            </div>
                            <button className='btn-return' onClick={handleClickReturn}>Go home</button>
                        </div>

                        <p className='desc-product'>{ description }</p>

                        <div className='detail-footer'>
                            <p className='category-product'><span>Category:</span> { category }</p>
                            <div className='add-product'>
                                <p className='price-product'><span>$</span> { price }</p>
                                <button className='btn-add'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}