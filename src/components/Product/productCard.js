import React from "react";
import "./styles.css";
import { Currency_icon, api_url } from '../../utils/constant';

const ProductCard = (props) => {
    return (
        <div className={props.className ? props.className : "costume-box"}>
            <div className="costume-block">
                {
                    props.sale_price &&
                        <div className="on-sale">
                            <span>ON SALE</span>
                        </div>
                }
                <div className="product-pack" >
                    <div className="costumes">
                        <img src={api_url + `${props.product_image.split(api_url).pop()}`} alt="icon" />
                    </div>
                </div>
            </div>

            <div className="costume-info my-list">
                {props.name}
                <span className="brand"> {props.unit}</span>
                <div className="product-card-bottom">
                    <div className="product-price"> {renderPrice(props)} </div>
                    <div className="add-cart">
                        <div className="add">
                            <i className="fas fa-cart-plus mr-5"></i>
                            Add
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;



function renderPrice(props) {
    if (props.product_type == "variable") {
        return (
            <span>
                {Currency_icon} {props.min_price} - {Currency_icon} {props.max_price}
            </span>
        );
    }
    else if (props.sale_price && props.sale_price !== props.price) {
        return (
            <>
                <span>
                    {Currency_icon} {props.sale_price}
                </span>
                <span className="old-price">
                    {Currency_icon}  {props.price}
                </span>
            </>
        );
    }
    else {
        return (
            <span>
                {Currency_icon} {props.price}
            </span>
        );
    }
}