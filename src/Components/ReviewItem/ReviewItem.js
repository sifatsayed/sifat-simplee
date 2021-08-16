import React from 'react';

const ReviewItem = (props) => {
    const {name , quantity,key,price} = props.product ;
    //console.log(props)
    const reviewItem = {
          borderBottom :'1px solid lightgray',
          marginBottom : '5px',
          paddingBottom : '5px',
          marginLeft : '100px',
    }
    return (
        <div style ={reviewItem}>
            <h5 className="product-name">Product Name : {name}</h5>
            <p>Quantity : {quantity}</p>
            <p><small>$ {price}</small></p>
            <br />
            <button
            onClick ={ () =>props.removeProduct(key)} 
             className="main-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;