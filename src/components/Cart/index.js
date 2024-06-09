import React from "react";
import "./style.css";
import EmptyCart from './EmptyCart';
import TableHead from './TableHead';
import TableData from './TableData';
// import { SpinnerLoader } from "../../utils/constants";
import CartData from "./CartData";
import { getCart, updateCart, deleteCart } from "../../store/actions/cartAction";
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from "lodash";

const Cart = (props) => {
    const dispatch = useDispatch();
    const { myCart } = useSelector((state) => state.cartReducer);
    const spinnerLoader = false;
    const removeCartProduct = (cartId) => {
        let userId = localStorage.getItem("userId");
        dispatch(deleteCart(cartId, () => {
            dispatch(getCart(userId))
        }));
    }
    const updateQty = (val, cartID) => {
        dispatch(updateCart(val, cartID, (completion) => { }));
    }

    return (
        // <div className="greybg">
        <div className="">
            {/* {spinnerLoader ? <SpinnerLoader /> : null} */}
            <div className={"container-fluid " + (spinnerLoader ? "spinner-time-div" : "")}>
                <div className="cart-caption">
                    <h2> Your Cart </h2>
                    <div className="d-flex justify-content-between">
                        <h6 class="text-body">Carefully check the information before checkout</h6>  
                        <h6 class="text-body"><a href="#" class="text-muted"><i class="fi-rs-trash mr-5"></i>Clear Cart</a></h6>
                    </div>
                </div>
                {
                    isEmpty(myCart) ? 
                        <EmptyCart/> : 
                            <div className="row">
                                <div className="table-responsive shopping-summery col-lg-8">
                                    <table className="table-responsive shopping-summery">
                                        <thead>
                                          <TableHead/>  
                                        </thead>
                                        <tbody>
                                           {
                                            myCart.map((item,index)=><TableData {...item} key={index}/>)
                                           }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                }


                <CartData
                    cartData={myCart}
                    updateQty={updateQty}
                    removeCartProduct={removeCartProduct}
                // is_emailVerify={this.props.is_emailVerify}
                // saveForLater={this.saveForLater}
                // removeFromLater={this.removeFromLater}
                />
            </div>
        </div>
    );
}
export default Cart;

