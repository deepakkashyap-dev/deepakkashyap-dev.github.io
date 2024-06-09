import {
    ADD_TO_CART,
    GET_CART,
} from "./../actionsTypes";
import { axiosInstance } from "../../utils/Service";
import { apiUrl } from "../../utils/urlEndpoints";
import _ from "lodash";
const token = localStorage.getItem("token");
// axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;

export const getCart = (payload) => {
    return (dispatch) => {
        var cartData = {};
        if (localStorage.getItem("cart") === null) {
            cartData = {};
        } else {
            cartData = JSON.parse(localStorage.getItem("cart"));
        }
        if (localStorage.getItem("token") === null) {
            localStorage.setItem("cart", JSON.stringify(cartData));
            dispatch(setGetCart(cartData))
        }
        else {
            return axiosInstance
                .post(apiUrl.cart.getCart, { userId: payload })
                .then((response) => {
                    dispatch(setGetCart(response.data.data));
                });
        }
    };
};
export const deleteCart = (cartid, completion) => {
    return (dispatch) => {
        if (localStorage.getItem("cart") === null) {
            var cartData = [];
        } else {
            cartData = JSON.parse(localStorage.getItem("cart"));
        }

        if (localStorage.getItem("token") === null) {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            _.pull(cartData, { "cartId": cartid });
            localStorage.setItem("cart", JSON.stringify(cartData));
            completion(cartid);
        } else {
            return axiosInstance
                .post(apiUrl.cart.deleteCart, { cartId: cartid })
                .then(() => {
                    completion(cartid);
                });
        }
    };
};

export const addCart = (payload, id, callback) => {
    return (dispatch) => {
        if (localStorage.getItem("cart") === null) {
            var cartData = {};
        } else {
            cartData = JSON.parse(localStorage.getItem("cart"));
        }

        if (localStorage.getItem("token") === null) {
            if (cartData[id] === undefined) {
                Object.assign(cartData, payload);
            } else {
                cartData[id].qty = parseInt(cartData[id].qty) + 1;
            }
            localStorage.setItem("cart", JSON.stringify(cartData));
            dispatch(addItemToCart(cartData));
            setTimeout(() => {
                callback(true);
            }, 1000);
        } else {
            let userId = localStorage.getItem("userId");
            let arr = [];
            Object.keys(payload).map((item) => {
                let data = {
                    product_id: item,
                    Quantity: payload[item].qty,
                    user_id: userId,
                    Attrs: payload[item].Attrs,
                    save_for_later: false,
                    sellerId: payload[item].sellerId
                };
                arr.push(data);
            });
            return axiosInstance
                .post(apiUrl.cart.addToCart, { cart: arr })
                .then((response) => {
                    dispatch(addItemToCart(response.data));
                    callback(true);
                })
                .catch((err) => {
                    callback(false);
                });
        }
    };
};

export const updateCart = (qty, id, completion) => {
    return (dispatch) => {
        if (localStorage.getItem("cart") === null) {
            var cartData = [];
        } else {
            cartData = JSON.parse(localStorage.getItem("cart"));
        }
        if (localStorage.getItem("token") === null) {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            const updatedArray = _.map(cartData, obj =>
                obj.id === id ? _.set(obj, "quantity", qty) : obj)
            localStorage.setItem("cart", JSON.stringify(updatedArray));
            completion({ _id: id, Quantity: qty });
        }
        else {
            let data = {
                cartId: id,
                quantity: qty,
            };
            axiosInstance.post(apiUrl.cart.updateCart, data).then((response) => {
                completion(response.data);
            });
        }
    };
};

export const updateCartProdQty = (payload, completion) => {
    return axiosInstance
        .post(apiUrl.cart.qtyUpdate, payload)
        .then((response) => {
            console.log(response, "response qty");
            completion(true);
        })
        .catch((err) => {
            console.log(err, "errqty");
            completion(false);
        });
};

export const addItemToCart = (productToAdd) => {
    return {
        type: ADD_TO_CART,
        payload: productToAdd,
    };
};

export const setGetCart = (productToAdd) => {
    return {
        type: GET_CART,
        payload: productToAdd,
    };
};

