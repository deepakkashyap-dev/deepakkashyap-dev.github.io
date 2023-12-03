import React from "react";
import { Link } from "react-router-dom";
import { Currency_icon, api_url } from '../../utils/constant';

const ProductCard = (props) => {
    return (
        <div className={props.className ? props.className : "costume-box"}>
            <div className="costume-block"  >
                {/* <Link
                    // to={`/product/${props.categoryName}/${props.id}/?cat=${props.categorySlug}`}
                    className={props.quantity <= 0 ? "sold" : ""}
                >
                    {props.deletedAt ? (
                        <div className="no-deliver-item">DISCONTINUED</div>
                    ) : props.Moderate ? (
                        <div className="no-deliver-item">Unavailable</div>
                    ) : props.quantity <= 0 ? (
                        <span>SOLD</span>
                    ) : null}
                </Link> */}

                {/* {
                    props.wishlistIcon ? (
                        <div className="costume-action">
                            {props.label ? <span className="new">{props.label}</span> : null}
                            <WishList pid={props.id} wishlistId={props.wishlist_id} />
                        </div>
                    ) : null
                } */}
                {
                    props.sale_price ?
                        <div className="on-sale">
                            <span>ON SALE</span>
                        </div>
                        : null
                }
                <Link
                    className="product-pack"
                    // to={`/product/${props.categoryName}/${props.id}/?cat=${props.categorySlug}`}
                    to={`/product`}
                >
                    <div className="costumes">
                        <img src={api_url + `${props.image.thumbnail}`} alt="icon" />
                    </div>
                </Link>
            </div>

            <Link
                to={`/product`}
            // to={`/ product / ${props.categoryName} /${props.id}/?cat=${props.categorySlug}`}
            >
                <div className="costume-info my-list">
                    <p>{renderPrice(props)}</p>
                    {props.name}
                    <span className="brand"> {props.unit}</span>
                </div>
            </Link>
        </div>
    );
};
export default ProductCard;



function renderPrice(props) {
    if (props.product_type == "variable") {
        return (
            <span className="buy-info">
                {Currency_icon} {props.min_price} - {Currency_icon} {props.max_price}
            </span>
        );
    }
    else if (props.sale_price && props.sale_price !== props.price) {
        return (
            <>
                <span className="buy-info">
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
            <span className="buy-info">
                {Currency_icon} {props.price}
            </span>
        );
    }

}