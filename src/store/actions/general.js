import {
    SET_SHOW_LOGIN_POPUP_VALUE,
    SET_REDIRECT_TO_PRIVATE_ROUTE,
    SET_REDIRECT_TO_NEXTPAGE,
    SET_IP_ADDRESS,
    SET_USER_LOC,
} from "../actionsTypes";

export const setLoginPopupStatus = (data) => {
    return {
        type: SET_SHOW_LOGIN_POPUP_VALUE,
        payload: data,
    };
};