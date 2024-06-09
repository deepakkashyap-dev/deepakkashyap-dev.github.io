import { combineReducers } from "redux";
import userProfileReducer from "./profile";
import searchItemInfo from './searchItem';
import authReducer from "./auth";
import dashboardInfoReducer from "./dashboard";
import cart from "./cart";
const rootReducer = combineReducers({
    userProfileReducer,
    searchItemInfo,
    authReducer,
    dashboardInfoReducer,
    cartReducer: cart,
});

export default rootReducer;