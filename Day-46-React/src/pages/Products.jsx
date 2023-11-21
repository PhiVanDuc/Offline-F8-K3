import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../redux/slices/productsSlice'
import { fetchInfoProduct } from '../redux/slices/cartsSlice'
import { detailProductSlice } from '../redux/slices/detailProductSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const { updateDetailProduct } = detailProductSlice.actions;

export default function Products({ updatePageNumber }) {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const totalPage = useSelector((state) => state.products.totalPage);

    const navigate = useNavigate();
    const { pageNumber } = useParams();

    const handlePageClick = ({ selected }) => {
        dispatch(fetchProducts(selected + 1, 20));
        navigate(`/products/${selected + 1}`);
        updatePageNumber(selected + 1);
    }

    useEffect(() => {
        updatePageNumber(pageNumber);
    }, []);

    const handleClickImage = (_id) => {
        navigate(`/detail-product/${_id}`);
        dispatch(updateDetailProduct({ _id }));
    }

    const handleClickAddCart = (_id) => {
        dispatch(fetchInfoProduct(_id));
    }
    
    return (
        <Fragment>
            <div className='page-products'>
                <div className="container">
                    <h2 className='page-heading'>PRODUCTS</h2>

                    <div className='products'>
                        {
                            products.map(({ _id, name, price, image }) => {
                                return (
                                    <div className="product" key={_id}>
                                        <img src={image} alt="Ảnh sản phẩm" onClick={() => { handleClickImage(_id) }} />
                                        <div className="info-product">
                                        <h3 className='name-product'>{name}</h3>
                                            <div className="buttom-product">
                                                <p className="price"><span>$</span> {price}</p>
                                                <div className="icon-add-cart" onClick={() => { handleClickAddCart(_id) }}>
                                                    <FontAwesomeIcon icon={ faCartShopping } />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={totalPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName='pagination'
                pageClassName='page-item'
                breakClassName='page-item'
                pageLinkClassName='page-link'
                breakLinkClassName='page-link'
                previousClassName='btn-previous'
                nextClassName='btn-next'
                activeClassName='active'
                forcePage={totalPage >= pageNumber ? pageNumber - 1 : -1}
            />
        </Fragment>
    )
}