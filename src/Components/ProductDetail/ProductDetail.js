import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from './../../fakeData/index';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)

    return (
        <div>
            <Product showAddToCard ={false} product ={product}></Product>
        </div>
    );
};

export default ProductDetail;