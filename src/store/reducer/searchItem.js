import {
    SET_SEARCH_ITEM,
    SET_SEARCH_VALUE,
    SET_SEARCH_SELECT_VALUE
} from '../actionsTypes';

const initialState = {
    suggestions: [],
    // searchedData: [],
    value: "",
    selectedVal: "",

}
const searchItemInfo = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_ITEM:
            return { ...state, suggestions: action.payload };
        case SET_SEARCH_VALUE:
            return { ...state, value: action.payload };
        case SET_SEARCH_SELECT_VALUE:
            return { ...state, selectedVal: action.payload };
        default:
            return state;
    }
}
export default searchItemInfo;