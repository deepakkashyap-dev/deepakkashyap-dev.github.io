import React from "react";
import { Link } from "react-router-dom";
import { priceWithSymbol } from "../../utils/constant";

const ProductCard = (props) => {
    // const location = useLocation()
    // let query = {
    //     ...parse(location.search),
    // };
    return (
        <div className={props.children ? "check-out-prod-card" : ""}>
            <div className="cartmenu cart-itemlist cart-list-item" key={props.cartId}>
                <div className={`cart-product ${props.data.deletedAt === 1 || props.data.outOfStock === 1 ? "not-deliver" : ""}`} >
                    {props.deletedAt ? (
                        <div className="no-deliver-item">DISCONTINUED</div>
                    ) : props.data.outOfStock ? (
                        <div className="no-deliver-item">OUT OF STOCK</div>
                    ) : null}

                    <figure>
                        <img src={props.data.img} alt="product" />
                    </figure>
                </div>

                <div
                    className="cart-product-text"
                    style={{ display: "flex", flexDirection: "column", width: "70%" }}
                >
                    <div className="cart-des">
                        {props.data.brand && (<span className="brandName">{props.data.brand}</span>)}
                        <span className="product-name">{props.data.title}</span>
                        <span className="price">
                            {priceWithSymbol(props.data.price)}/
                            <sub className="qty-type">
                                {props.data.QtyType}
                            </sub>
                            {/* {
                                    query.perk ?
                                        priceWithSymbol(parseInt(decode(query.perk))) :
                                        priceWithSymbol(props.price)
                                } */}
                        </span>
                    </div>
                </div>
                <div className="delete-cart-product">
                    {props.children}
                    {props.removeCartProduct && (
                        <span
                            className="delete-product"
                            onClick={() =>
                                window.confirm("Do you want to remove this product from Cart ?")
                                && props.removeCartProduct(props.cartId)
                            }
                        >
                            {/* <img src="/assets/images/trash-icn.svg" alt="trash-icn" /> */}
                            <img src="/assets/images/delete-icon.png" alt="trash-icn" />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
