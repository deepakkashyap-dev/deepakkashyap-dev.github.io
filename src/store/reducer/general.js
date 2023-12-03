import {
    SET_SHOW_LOGIN_POPUP_VALUE,
    SET_REDIRECT_TO_PRIVATE_ROUTE,
    SET_REDIRECT_TO_NEXTPAGE,
    SET_IP_ADDRESS,
    SET_USER_LOC,
} from "../actionsTypes";

const initialState = {
    showLoginPopup: false,
    redirectedToPrivateRoute: false,
    redirectToNextPage: false,
    ip_address: "",
    userLocation: {}
};
const generalInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHOW_LOGIN_POPUP_VALUE:
            return { ...state, showLoginPopup: action.payload };
        case SET_REDIRECT_TO_PRIVATE_ROUTE:
            return { ...state, redirectedToPrivateRoute: action.payload };
        case SET_REDIRECT_TO_NEXTPAGE:
            return { ...state, redirectToNextPage: action.payload };
        case SET_IP_ADDRESS:
            return { ...state, ip_address: action.payload };
        case SET_USER_LOC:
            return { ...state, userLocation: { ...state.userLocation, ...action.payload } }
        default:
            return state;
    }
};
export default generalInfo;
