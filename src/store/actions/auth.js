import {
    SET_SHOW_LOGIN_POPUP_VALUE,
    SET_LOGGED_USER_INFO,
    SET_LOGIN_USER_ERROR,
    SET_REDIRECT_TO_PRIVATE_ROUTE,
    SET_REDIRECT_TO_NEXTPAGE,
    SET_SIGNUP_USER_ERROR,
    SET_IP_ADDRESS,
    SET_USER_LOC,
    SAVE_NOTIFICATION_IN_STORE,
    UPDATE_NOTIFICATION_LIST,
    SET_NETWORK_STATUS
} from "./../actionsTypes";
import { axiosInstance, Authorization } from "../../utils/Service";
import { apiUrl } from "../../utils/urlEndpoints";
//   import { getUserAddress } from "./profile";
  import { addCart } from "./cartAction";
//   import { getWishList } from "./Wishlist";
import { get, filter as loFilter, sum } from "lodash";

const token = localStorage.getItem("token");
axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
export const setLoginPopupStatus = (data) => {
    console.log(data,"setLoginPopupStatus")
    return {
        type: SET_SHOW_LOGIN_POPUP_VALUE,
        payload: data,
    };
};

export const setLoggedUserInfo = (loggedUserInfo) => {
    return {
        type: SET_LOGGED_USER_INFO,
        payload: loggedUserInfo,
    };
};

export const setNetworkStatus = (netWorkStatus) => {
    return {
        type: SET_NETWORK_STATUS,
        payload: netWorkStatus,
    };
}

export const logout = (status) => {
    // cleareWishlist()
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // return setLoggedUserInfo({
    //     isLoggedIn: false,
    //     email: '',
    //     userId: '',
    //     userName: ''
    // })
    window.location.href = "/";
    // window.location.reload();
};

export const showLoginErr = (data) => {
    return {
        type: SET_LOGIN_USER_ERROR,
        payload: data,
    };
};

export const showSignupErr = (data) => {
    return {
        type: SET_SIGNUP_USER_ERROR,
        payload: data,
    };
};

export const getIpAddress = () => {
    return async (dispatch) => {
        try {
            // const res = await fetch("https://api.ipify.org?format=json");
            const res = await fetch("http://ip.jsontest.com/");
            const json = await res.json();
            await dispatch(setIpAddredd(json));
        }
        catch (err) {
            console.log(err, "get ip error catch")
        }
    };
};

const setIpAddredd = (data) => {
    return {
        type: SET_IP_ADDRESS,
        payload: data,
    };
};

export const getUseLocation = (myLat, myLon, mapApi) => {
    return (dispatch) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + mapApi)
            .then((response) => response.json())
            .then((responseJson) => {
                let streetAdddr = responseJson.results
                    .filter(a => a.types.includes("street_address") || a.types.includes("administrative_area_level_2"))[0].address_components
                    .filter(x => x.types.includes("sublocality_level_2") || x.types.includes("administrative_area_level_2"))[0].short_name
                let fullAddress = responseJson.results.filter(a => a.types.includes("street_address") || a.types.includes("administrative_area_level_2"))[0].address_components
                let pinCode = []
                responseJson.results // for getting pin in all array 
                    .filter(a => a.types.includes("postal_code") || a.types.includes("street_address") || a.types.includes("administrative_area_level_2"))
                    .filter(b => b.address_components.map(c => {
                        if (c.types.includes('postal_code')) {
                            pinCode.push(c.short_name)
                        }
                    }))
                // let pinCode = responseJson.results.filter(a => a.types.includes("street_address"))[0].address_components
                //   .filter(x => x.types.includes("postal_code"))[0].short_name
                dispatch(setUseLocation({ streetAdddr, fullAddress, pinCode }));
            })
    };
};

export const getCityByZip = (zip, mapApi) => {
    return (dispatch) => {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + zip + '&sensor=' + true + '&key=' + mapApi)
            .then(res => res.json())
            .then(resJson => {
                let cityArr = resJson.results[0].address_components.filter(o => o.types.includes("political")).map(i => i.short_name)
                dispatch({
                    type: SET_USER_LOC,
                    payload: { cityArr, userInputZip: zip },
                });
            })
            .catch(err => console.log(err, "errrs"))
    };
};

const setUseLocation = (data) => {
    return {
        type: SET_USER_LOC,
        payload: data,
    };
};


export const setToken = (payload) => {
    const loginInfo = Authorization(payload.data.token);
    if (loginInfo.status) {
        localStorage.setItem("userId", loginInfo.payload.userId);
        return setLoggedUserInfo({
            isLoggedIn: loginInfo.status,
            email: loginInfo.payload.email,
            userId: loginInfo.payload.userId,
            userName: loginInfo.payload.name.split(" ")[0],
        });
    } else {
        return setLoggedUserInfo({
            isLoggedIn: loginInfo.status,
        });
    }
};

export const loginRequest = (payload, completion) => {
    return (dispatch) => {
        return axiosInstance
            .post(apiUrl.auth.login, payload)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    dispatch(setToken(response));
                    localStorage.setItem("token", response.data.token);
                    // localStorage.setItem("userId", response.data.userId);
                    // localStorage.setItem("socket_token", response.data.socket_token);
                    // dispatch(addtocart());
                    // dispatch(getWishList());
                    // dispatch(getUserAddress());
                    completion({ status: true });
                } else {
                    completion({ status: false });
                }
            })
            .catch((err) => {
                const obj = get(err, ['response', 'data'], false)
                if (obj.token) {
                    completion({ status: false, ...obj });
                }
                else {
                    let data = { errData: obj.error ? obj.error : obj.message, status: true };
                    completion({ status: false, data });
                    dispatch(showLoginErr(data));
                }
                // else completion({ status: false });
            });
    };
};


export const signUpRequest = (payload, completion) => {
    return (dispatch) => {
        return axiosInstance
            .post(apiUrl.auth.signup, payload)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    // dispatch(setToken(response))
                    // localStorage.setItem('token',response.data.token)
                    dispatch(addtocart(response));
                    completion({ status: true, res: response.data, statucCode: response.status });
                } else {
                    completion({ status: false });
                }
            })
            .catch((err) => {
                if (err.response.data.userId) {
                    completion({ status: true, res: err.response.data });
                }
                else {
                    let data = { errData: err.response.data.Message, status: true };
                    completion({ status: false, data });
                    dispatch(showSignupErr(data));
                }
            });
    };
};
export const OTPVerify = (payload, completion) => {
    return (dispatch) => {
        return axiosInstance
            .post(apiUrl.auth.OTPVerify, payload, {
                headers: {
                    Authorization: "Bearer " + payload.token,
                },
            })
            .then((response) => {
                completion({ data: response.data, status: true })
            })
            .catch((err) => {
                completion({ status: false, data: err.response.data })
            });
    };
};

export const resendMobileOTP = (payload, callback) => {
    return axiosInstance
        .post(apiUrl.auth.resendMobileOTP, payload, {
            headers: {
                Authorization: "Bearer " + payload.token,
            },
        })
        .then((response) => {
            callback(response.data)
        })
        .catch((err) => {

        });
};

export const resendEmailLink = (payload, callback) => {
    return axiosInstance
        .post(apiUrl.auth.resendEmailLink, payload, {
            headers: {
                Authorization: "Bearer " + payload.token,
            },
        })
        .then((response) => {
            callback(response.data)
        })
        .catch((err) => {
        });
};


export const setRedirectToPrivateRoute = (data) => {
    return {
        type: SET_REDIRECT_TO_PRIVATE_ROUTE,
        payload: data,
    };
};

export const setRedirectToNextPage = (data) => {
    return {
        type: SET_REDIRECT_TO_NEXTPAGE,
        payload: data,
    };
};

export const socialLogin = (payload, completion) => {
    // console.log(payload,"--")
    return (dispatch) => {
        return axiosInstance
            .post(apiUrl.auth.socialLogin, payload)
            .then((response) => {
                //   console.log(response, "-0-0-");
                //   dispatch(setToken(response));
                //   localStorage.setItem("token", response.data.token);
                //   localStorage.setItem("userId", response.data.userId);
                //   dispatch(addtocart(response));
                //   dispatch(getWishList());
                //   dispatch(getUserAddress());
                completion(true);
            })
            .catch((err) => {
                console.log(err, "----+++");
                completion(false);
            });
    };
};

export const forgotPassword = (payload, completion) => {
    return (dispatch) => {
        return axiosInstance
            .post(apiUrl.auth.forgotpassword, { email: payload })
            .then((response) => {
                if (response.status === 200) {
                    completion(true);
                } else {
                    completion(false);
                }
            })
            .catch((err) => {
                completion(false);
            });
    };
};
export const addtocart = () => {
    return (dispatch) => {
        if (localStorage.getItem("cart") === null) {
            var cartData = {};
        } else {
            cartData = JSON.parse(localStorage.getItem("cart"));
            dispatch(addCart(cartData, "", (callback) => { }));
            localStorage.removeItem("cart");
        }
    };
};

export const getnotification = (payload, completion) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post(
                apiUrl.auth.notification,
                payload
            );
            dispatch(saveNotificationList(response.data));
        } catch (err) { }
    };
};

const saveNotificationList = (data) => {
    return {
        type: SAVE_NOTIFICATION_IN_STORE,
        payload: data,
    };
};

export const readnotification = async (payload, completion) => {
    try {
        const response = await axiosInstance.post(
            apiUrl.auth.readnotification,
            payload
        );
        completion(true);
    } catch (err) { }
};

export const totalUnreadNotification = async (payload, completion) => {
    try {
        const response = await axiosInstance.post(
            apiUrl.auth.totalUnreadNotification,
            payload
        );
        completion(response.data.total_notification_data);
    } catch (err) {
        completion(0);
    }
};

export const deleteNotification = async (payload, completion) => {
    try {
        const response = await axiosInstance.post(
            apiUrl.auth.deleteNotification,
            payload
        );
        completion(true);
    } catch (err) {
        completion(false);
    }
};

export const updateNotificationList = (data) => {
    return {
        type: UPDATE_NOTIFICATION_LIST,
        payload: data,
    };
};
