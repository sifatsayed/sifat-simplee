import React, { useEffect, useState } from 'react';
import Cart from '../Components/Cart/Cart';
import ReviewItem from '../Components/ReviewItem/ReviewItem';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../utilities/databaseManager';
import fakeData from './../fakeData/index';
import happyImage from '../images/giphy.gif'
const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPlaced , setOrderedPlaced] = useState(false);
    const handlePlaceOrder =()=>{
        setCart([])
        setOrderedPlaced(true);
        processOrder()
       // console.log('Order Placed SuccesFully')
    }
    const removeProduct = (productKey) =>{
       // console.log('removed Clicked',productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    useEffect(() =>{
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key]
            return product;
        })
        setCart(cartProducts)
    },[])
    let thankyou ;
    if(orderPlaced){
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem
                    key = {pd.key}
                    removeProduct ={removeProduct}
                     product ={pd}></ReviewItem>)
            }
            {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                    onClick={handlePlaceOrder}
                     className="main-button">Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;