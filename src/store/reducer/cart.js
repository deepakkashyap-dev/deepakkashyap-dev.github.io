import {
    ADD_TO_CART,
    GET_CART,
} from "../actionsTypes";
import { cartDataArray } from "../temp_json";

const initialState = {
    myCart: cartDataArray,
};

function addcart(state, payload) {
    return state;
}

const Cart = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addcart(state, action.payload);
        case GET_CART:
            return { ...state, myCart: action.payload };
        // case SAVE_STATIC_BANNER_IN_CART_PAGE:
        //     return { ...state, static_block_data: action.payload };
        default:
            return state;
    }
};
export default Cart;





