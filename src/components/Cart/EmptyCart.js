import React from "react";
const EmptyCart = () =>{
    return(
        <div className="cart-caption">
            <div className="product-head">
                <div className="product-img">
                    <img src="\assets\images\no-product.png" alt="img"></img>
                    {/* <img src="\assets\images\empty-cart1.jfif" alt="img"></img> */}
                </div>
                <h6> Add Product in Your Cart</h6>
            </div>
        </div>
    )
}
export default EmptyCart