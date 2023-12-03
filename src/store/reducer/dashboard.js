import {
    SET_DASHBOARD_BLOCK_DATA,
    SET_BANNER_IMAGE_DATA,
    SET_DASHBOARD_PRODUCT_DATA,
    SAVE_WISHLIST_DATA,
} from "./../actionsTypes";

const initialState = {
    dashboardBlockData: [],
    bannerImage: [],
    wishlist: [],
};

const dashboardInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_BLOCK_DATA:
            return { ...state, dashboardBlockData: action.payload };
        case SET_DASHBOARD_PRODUCT_DATA:
            return { ...state, [action.payload.blockID]: action.payload };
        case SET_BANNER_IMAGE_DATA:
            return { ...state, bannerImage: action.payload };
        case SAVE_WISHLIST_DATA:
            return { ...state, wishlist: action.payload };
        default:
            return state;
    }
};
export default dashboardInfo;
