import {
    SET_DASHBOARD_BLOCK_DATA,
    SET_BANNER_IMAGE_DATA,
    SET_DASHBOARD_PRODUCT_DATA,
    SAVE_WISHLIST_DATA,
} from "./../actionsTypes";

import { category_block } from '../temp_json';


export const getHomePageBlocks = () => {
    ///this give home page component  data not product data
    return (dispatch) => {
        dispatch({
            type: SET_DASHBOARD_BLOCK_DATA,
            payload: category_block,
        });
    }
    // return axiosInstance.get(apiUrl.homepage.all).then((response) => {
    //     dispatch(setDashboardBlock(response.data));
    //     dispatch({
    //         type: SET_DASHBOARD_BLOCK_DATA,
    //         payload: data,
    //     });
    // });
    // };
};