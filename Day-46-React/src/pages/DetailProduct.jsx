import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailProduct } from '../redux/slices/detailProductSlice';
import { fetchProducts } from '../redux/slices/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { notify } from '../utilities/notify';
import { fetchInfoProduct } from '../redux/slices/cartsSlice';

export default function DetailProduct() {
    const { detail } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { brand, category, description, image, name, price } = useSelector((state) => state.detailProduct.detailProduct);
    const status = useSelector((state) => state.detailProduct.status);
    const statusCarts = useSelector((state) => state.carts.status);

    useEffect(() => {
        dispatch(fetchDetailProduct(detail));
    }, []);

    const handleClickReturn = () => {
        navigate("/products/1");
        dispatch(fetchProducts({ param: 1, limit: 20 }));
    }

    const handleClickAdd = (_id) => {
        dispatch(fetchInfoProduct(_id));
        if (statusCarts === "fulfilled") notify("success", "Thêm sản phẩm thành công!");
        else if (statusCarts === "rejected") notify("error", "Thêm sản phẩm thất bại!");
    }

    return (
        <div className='detail-product'>
            {
                status === "rejected" ? <h1>Lỗi</h1> : status === "pending" ? <Loading /> : (
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
                                        <button className='btn-add' onClick={() => {handleClickAdd(detail)}}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}