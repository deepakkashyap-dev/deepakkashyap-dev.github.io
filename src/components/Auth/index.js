import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from "react-router-dom";
import {
    setLoginPopupStatus,
    showLoginErr,
    socialLogin,
} from "../../store/actions/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Signup";
import Login from "./Login";
import Toast from "light-toast";
import './style.css'
const Auth = () => {
    const dispatch = useDispatch();
    const { showLoginPopup } = useSelector((state) => state.authReducer);
    const [screenToShow, setScreenToShow] = React.useState(useSelector((state) => state.authReducer.showLoginPopup.screenToShow))

    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)

    const closePopup = () => {
        dispatch(setLoginPopupStatus(false));
        dispatch(showLoginErr({ status: false, errData: "" }));
    };
    const switchScreen = (screenToShow) => {
        setScreenToShow(screenToShow);
    };
    const responseFacebook = (response) => {
        console.log(response);
        if (response.status !== "unknown") {
            const name = response.name.split(" ");
            const first_name = name[0];
            const last_name = name[name.length - 1];
            const email = response.email;
            const socialId = response.id;
            const payload = {
                first_name,
                last_name,
                email,
                socialId,
                provider: "facebook",
            };
            dispatch(
                socialLogin(payload, (status) => {
                    if (status) Toast.success("Logged-In  with Facebook", 1000, () => closePopup());
                })
            )
        }
    };

    //######  function for focus on next on hit enter #################
    const handleEnter = (event) => {
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const responseGoogle = (response) => {
        const data = response.profileObj;
        const first_name = data.givenName;
        const last_name = data.familyName;
        const email = data.email;
        const socialId = data.googleId;
        const payload = {
            first_name,
            last_name,
            email,
            socialId,
            provider: "google",
        };
        dispatch(
            socialLogin(payload, (status) => {
                if (status)
                    Toast.success("Signed with Google", 1000, () => closePopup());
            }));
    };

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, []);

    const onSocialLoginResolve = ({ provider, data }) => {
        setProvider(provider)
        setProfile(data)
    }


    return (
        <div className="popup-wrap">
            {screenToShow === "login" ? (
                <Login
                    closePopup={closePopup}
                    switchScreen={switchScreen}
                    responseGoogle={responseGoogle}
                    responseFacebook={responseFacebook}
                    handleEnter={handleEnter}
                    addToast={toast}
                    onResolve={onSocialLoginResolve}
                    onLogoutSuccess={onLogoutSuccess}
                />
            ) : (
                <Signup
                    closePopup={closePopup}
                    switchScreen={switchScreen}
                    responseGoogle={responseGoogle}
                    responseFacebook={responseFacebook}
                    handleEnter={handleEnter}
                    addToast={toast}
                    onResolve={onSocialLoginResolve}
                    onLogoutSuccess={onLogoutSuccess}
                />
            )}
            <ToastContainer />
        </div>
    );
}
export default Auth;
