import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Currency_icon } from "../../utils/constant";
import ProductCard from "./ProductCard";
import EnterQuantity from "./EnterQuantity";

const CartData = (props) => {
    let totalprice = 0;
    return (
        <div className="cartsection">
                <div>
                    {props.cartData.map((item, i) => {
                        totalprice += parseFloat(item.price); //* props.cartData[item].qty;
                        return (
                            <ProductCard
                                data={item}
                                cartId={item["cartId"]}
                                removeCartProduct={props.removeCartProduct}
                                key={i}
                            >
                                <EnterQuantity
                                    qty={item["quantity"]}
                                    setQuantity={(val) =>
                                        props.updateQty(val, item["cartId"])
                                    }
                                />
                            </ProductCard>
                        );
                    })}

                    <div className="cart-bottom">
                        <h6 className="cart-total">
                            <span>Total</span> {Currency_icon} {totalprice}
                        </h6>
                        <Link to="/checkout">
                            <button className="shop-now">Proceed to checkout</button>
                        </Link>
                    </div>
                </div>
        </div>
    );
}

export default CartData;
