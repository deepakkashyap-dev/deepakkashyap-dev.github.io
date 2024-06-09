import {
    SET_DASHBOARD_BLOCK_DATA,
    SET_DASHBOARD_PRODUCT_DATA,
    SAVE_WISHLIST_DATA,
} from "./../actionsTypes";
import {axiosInstance} from "../../utils/Service";
import {apiUrl} from "../../utils/urlEndpoints";

export const getHomePageBlocks  = () => async (dispatch) => {  // give me all the blocks of the homepage 
    try {
        const response = await axiosInstance.get(apiUrl.homepage.all);
        dispatch({
            type: SET_DASHBOARD_BLOCK_DATA,
            payload: response.data,
          })
    } catch (error) {
        console.log("error", error);
    }
};

export const getHomePageBlock_data  = (pk,block_name=null) => async (dispatch) => {  // give me detail of a particular block of the homepage
    try {
        const response = await axiosInstance.get(apiUrl.homepage.by_id+pk);
        if(block_name){ // if block_name is not null then dispatch the data with block_name-- save product in store
            dispatch({
                type: SET_DASHBOARD_PRODUCT_DATA,
                payload: {data : response.data,blockID : block_name},
            })
        }
        else{
            return response.data;
        }
    } catch (error) {
        console.log("error", error);
    }
};


export const getProducts = async(apiUrl) =>  {  // provide product list
    try {
        const response = await axiosInstance.get(apiUrl);
        return response;
        // if(block_name){  
        //     dispatch({
        //         type: SET_DASHBOARD_PRODUCT_DATA,
        //         payload: {data : response.data,blockID : block_name},
        //     })
        // }
        // else{
        //     return response.data;
        // }
    } catch (error) {
        console.log("error", error);
    }
};