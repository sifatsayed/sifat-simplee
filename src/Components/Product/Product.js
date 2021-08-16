import React from 'react';
import './Product.css';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
   // console.log(props)
    const {img,name,seller,price,stock,key} = props.product;
    return (
        <div className="product">
            <div> 
                 <img src={img} alt="" />
            </div>
            <div>
             <p className="product-name"><Link to = {"/product/" + key}>{name}</Link></p> 
             <p><small>By : {seller}</small></p>
             <p><small>Price : {price}$</small></p>
             <p><small>Only have in stock {stock} order soon</small> </p>
             {props.showAddToCard && <button className="main-button"
             onClick={()=>props.handleAddProduct(props.product)} > 
             <FontAwesomeIcon icon={faShoppingCart} /> add to card</button>}

            </div>
        </div>
    );
};

export default Product;