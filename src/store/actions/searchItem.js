
import {
    SET_SEARCH_ITEM,
    SET_SEARCH_VALUE,
    SET_SEARCH_SELECT_VALUE
} from './../actionsTypes'
import { axiosInstance } from "../../utils/Service";
import { apiUrl } from "../../utils/urlEndpoints";
const fruits = [
    {
        name: 'mango',
        year: 1972
    },
    {
        name: 'mado',
        year: 1972
    },
    {
        name: 'mago',
        year: 1972
    },
    {
        name: 'mano',
        year: 1972
    },
    {
        name: 'Apple',
        year: 2012
    },
    {
        name: 'blueberry',
        year: 2012
    },
    {
        name: 'caketus',
        year: 2012
    },
    {
        name: 'tomato',
        year: 2012
    },
    {
        name: 'potato',
        year: 2012
    },
];


export const searchItem = (payload) => {
    return async(dispatch) => {
        const inputLength = payload.length;
        if(inputLength){
            const inputValue = payload.trim().toLowerCase();
            const response = await axiosInstance.post(apiUrl.product.search, { 'keyword': inputValue });
            return dispatch(setSearchItem(response.data));
        }
        return [];
        // axiosInstance.post(apiUrl.homepage.productList, { searchValue: payload, userId })
        //     .then(response => {
        //         if (response.data.data.length === 0) {
        //             dispatch(setSearchItem(["not"]));
        //         } else {
        //             dispatch(setSearchItem(response.data.data));
        //         }
        //     })
    }
}

export const updateSearchVal = (payload) => {
    return dispatch => {
        dispatch({
            type: SET_SEARCH_VALUE,
            payload: payload,
        });
    }
}
export const updateSearchSelectVal = (payload) => {
    return dispatch => {
        dispatch({
            type: SET_SEARCH_SELECT_VALUE,
            payload: payload,
        });
    }
}


export const resetSearchItem = (payload) => {
    return dispatch => {
        dispatch(setSearchItem(["not"]));
    }
}

const setSearchItem = (payload) => {
    return {
        type: SET_SEARCH_ITEM,
        payload: payload,
    }
}
