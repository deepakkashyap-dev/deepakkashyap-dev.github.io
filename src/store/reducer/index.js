import { combineReducers } from "redux";
import userProfile from "./profile";
import searchItemInfo from './searchItem';
import authReducer from "./auth";
import dashboardInfo from "./dashboard";
const rootReducer = combineReducers({
    userProfile,
    searchItemInfo,
    authReducer,
    dashboardInfo
});

export default rootReducer;