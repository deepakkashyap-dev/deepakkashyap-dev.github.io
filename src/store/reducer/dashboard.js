import {
    SET_DASHBOARD_BLOCK_DATA,
    SET_DASHBOARD_PRODUCT_DATA,
    SAVE_WISHLIST_DATA,
} from "./../actionsTypes";

const initialState = {
    dashboardBlockData: [],
    bannerImage: [],
    wishlist: [],
};

const dashboardInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DASHBOARD_BLOCK_DATA:
            return { ...state, dashboardBlockData: action.payload };
        case SET_DASHBOARD_PRODUCT_DATA:
            return saveDashboardProduct(state, action.payload);
        case SAVE_WISHLIST_DATA:
            return { ...state, wishlist: action.payload };
        default:
            return state;
    }
};
export default dashboardInfoReducer;


function saveDashboardProduct (state, payload) {
      if (state.blockID) {
        return { ...state, [payload.blockID]: [...state[payload.blockID],...payload.data] };
      } else {
        return { ...state, [payload.blockID]: payload.data };
        };
  };
