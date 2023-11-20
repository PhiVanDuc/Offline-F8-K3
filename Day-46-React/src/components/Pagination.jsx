import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTotalPage, fetchProducts } from '../redux/slices/productsSlice';
import ReactPaginate from 'react-paginate';

export default function Pagination({ updateCurrentPage }) {
    const dispatch = useDispatch();
    const totalPage = useSelector((state) => state.products.totalPage);

    useEffect(() => {
        dispatch(fetchTotalPage());
    }, []);

    const handlePageClick = ({ selected }) => {
        dispatch(fetchProducts(selected + 1, 20));
        updateCurrentPage(selected + 1);
    }

    console.log("Paginate re-render");

    return (
        
    )
}
