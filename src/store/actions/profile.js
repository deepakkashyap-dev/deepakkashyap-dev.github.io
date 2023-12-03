// import { axiosInstance } from "./../../utils/Service";
// import { apiUrl } from "./../../utils/urlEndpoints";
import {
    SET_USER_ADDRESS_INFO,
    SAVE_MY_ADDED_PRODUCT
} from "./../actionsTypes";


// export const getProfileInfo = (userId) => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axiosInstance
//             .post(
//                 apiUrl.contact.user,
//                 { userId: userId },
//                 {
//                     headers: {
//                         Authorization: "Bearer " + token,
//                     },
//                 }
//             )
//             .then((response) => {
//                 dispatch(setUserContactInfo(response.data));
//             });
//     };
// };

// export const getUserAddress = () => {
//     const token = localStorage.getItem("token");
//     return (dispatch) => {
//         return axiosInstance
//             .post(
//                 apiUrl.userAddress.getUserAddress,
//                 // { userId: userId },
//                 {
//                     headers: {
//                         Authorization: "Bearer " + token,
//                     },
//                 }
//             )
//             .then((response) => {
//                 let data = response.data.data.map((item, i) => {
//                     if (i === 0) {
//                         return { ...item, disabled: true, makeDefault: true };
//                     } else {
//                         return { ...item, disabled: true, makeDefault: false };
//                     }
//                 });
//                 dispatch(saveUserAddress(data));
//             })
//             .catch((err) => { });
//     };
// };

// export const addUserAddress = (payload, completion) => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     return (dispatch) => {
//         return axiosInstance
//             .post(apiUrl.userAddress.addUserAddress, payload, {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             })
//             .then((response) => {
//                 dispatch(getUserAddress());
//                 completion(true);
//             })
//             .catch((err) => {
//                 completion(false);
//             });
//     };
// };

// export const updateAddress = (payload, completion) => {
//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     return (dispatch) => {
//         return axiosInstance
//             .put(apiUrl.userAddress.updateUserAddress, payload, {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                 },
//             })
//             .then((response) => {
//                 dispatch(getUserAddress());
//                 completion(true);
//             })
//             .catch((err) => {
//                 completion(false);
//             });
//     };
// };
