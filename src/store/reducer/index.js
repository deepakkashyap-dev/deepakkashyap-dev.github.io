import { combineReducers } from "redux";
import userProfile from "./profile";
import searchItemInfo from './searchItem';
import generalInfo from "./general";
import dashboardInfo from "./dashboard";
const rootReducer = combineReducers({
    userProfile,
    searchItemInfo,
    generalInfo,
    dashboardInfo
});

export default rootReducer;