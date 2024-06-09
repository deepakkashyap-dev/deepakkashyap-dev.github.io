import {
    SET_USER_ADDRESS_INFO
} from "./../actionsTypes"

const initialState = {
    userAddress: [],
    error: {
        status: false,
        errData: "",
    },
    SignupError: {
        status: false,
        errData: "",
    },
    loggedUserInfo: {
        isLoggedIn: false,
        userId: "",
        name: "Deepak",
        email: "d.kashyap555@gmail.com",
        mobileNo: "",
    },
    forgot: "",
    networkStatus: ""
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ADDRESS_INFO:
            return { ...state, userAddress: action.payload };

        default:
            return { ...state };
    }
};
export default userProfileReducer;
