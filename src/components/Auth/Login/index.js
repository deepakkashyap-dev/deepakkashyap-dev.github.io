import React, { useEffect, useState } from "react";
import Toast from "light-toast";
import {
    loginRequest,
    forgotPassword,
    OTPVerify,
    resendMobileOTP,
    resendEmailLink
} from "../../../store/actions/auth";
import { getProfileBannerInfo } from "../../../store/actions/profile";
import { LoginSocialGoogle, LoginSocialFacebook, LoginSocialApple } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton, AppleLoginButton } from 'react-social-login-buttons';

import { Helmet } from "react-helmet";
// import ForgotPass from "./ForgotPass";
import TextField from '@mui/material/TextField';
// import OTPForm from './OTPform';
import { useSelector, useDispatch } from 'react-redux';

const Login = (props) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLoginPopup, setshowLoginPopup] = useState(useSelector((state) => state.authReducer.showLoginPopup));
    const [loginErr, setLoginErr] = useState(false);
    const [showInputForm, setShowInputForm] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [status, setStatus] = useState(false);
    const [showOTPform, setShowOTPform] = useState(false);
    const [OTP, setOTP] = useState("");
    const [token, setToken] = useState("");// for otp user
    const [showPass, setShowPass] = useState(false);
    const [time, setTime] = useState(120); //timer for resend otp

    const loginCallback = (status) => {
        if (status.status) {
            dispatch(getProfileBannerInfo());
            window.location.reload();
            Toast.success("Login Successfully", 500, () => {
                props.closePopup();
            });
        } else {
            Toast.hide();
            console.log(status, "statusstatus")
            if (Object.keys(status).includes("mobileVerified")) {//if response contain {mobileVerified:false} ex mobile otp related 
                setShowOTPform(true);
                setToken(status.token);
                props.addToast(status.message, { appearance: "success" });
            }
            else if (Object.keys(status).includes("emailVerified")) {//if response contain {emailVerified:false} ex email verify link related 
                props.addToast(status.message, { appearance: "success" });
            }
            else {
                setStatus(status.data.status);
                setErrorMsg(status.data.errData);
                props.addToast(status.data.errData, { appearance: "error" });
                // Toast.fail("Login Fail..", 1000);
                // window.location.reload();
            }
        }
    }

    const formSubmit = (e) => {
        e.preventDefault();
        Toast.loading("Loading...");
        const payload = { email, password };
        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("bazaarEmail", rememberMe ? email : "");
        localStorage.setItem("bazaarPass", rememberMe ? password : "");
        dispatch(loginRequest(payload, loginCallback))
    };

    const onLoginStart = React.useCallback(() => {
        alert('login start')
    }, [])

    return (
        <div className={"signup-form " + (showOTPform ? " otp-open" : "")}>
            <Helmet>
                <style>
                    {`
           .facebook-button-holder, .google-button-holder {
            position: relative;
            margin-bottom:20px;
           }
           .facebook-button-holder button, .google-button-holder button {
            width:100%;
           }
            .facebook-button-holder span button, .google-button-holder button:first-child {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 15;
              width: 100%;
              height: 100%;
              opacity:0 !important;
              
            }
            `}
                </style>
            </Helmet>
            <button className="close-btn" onClick={() => props.closePopup()} >
                <i className="fal fa-times-circle"></i>
            </button>

            <div className="inner-sign" style={showOTPform ? { justifyContent: "space-around" } : {}}>
                {
                    showOTPform ?
                        // <OTPForm
                        //     OTP={OTP}
                        //     setState={(key, val) => this.setState({ [key]: val })}
                        //     submitOTP={this.submitOTP}
                        //     time={time}
                        //     resendMobOTP={this.resendMobOTP}
                        //     resendEmail={this.resendEmail}
                        // />
                        ""
                        :
                        <>
                            <div className="sign-img log-img">
                                <div className="sign-opp-wrap">
                                    <img src={"/assets/images/authPageImage.jpeg"} alt="login" />
                                </div>
                            </div>
                            {/* {showForgotPassword && (
                                <ForgotPass
                                    forgotPassword={this.props.forgotPassword}
                                    forgotMsg={this.props.forgotMsg}
                                />
                            )} */}
                            {showInputForm && (
                                <div className="sign-form">
                                    <form onSubmit={(e) => formSubmit(e)}>
                                        <div className="detail-from">
                                            <h4 className="form-title">
                                                Log in
                                            </h4>
                                            <LoginSocialGoogle
                                                isOnlyGetToken
                                                client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
                                                onLoginStart={onLoginStart}
                                                onResolve={props.onResolve}
                                                onReject={(err) => {
                                                    console.log(err)
                                                }}
                                            >
                                                <GoogleLoginButton />
                                            </LoginSocialGoogle>
                                            {/* </div> */}
                                            {/* <div className="facebook-button-holder"> */}
                                            <LoginSocialFacebook
                                                isOnlyGetToken
                                                appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID || ''}
                                                onLoginStart={onLoginStart}
                                                onResolve={props.onResolve}
                                                onReject={(err) => {
                                                    console.log(err)
                                                }}
                                            >
                                                <FacebookLoginButton />
                                            </LoginSocialFacebook>
                                            {/* </div> */}
                                            {/* <div className="google-button-holder"> */}

                                            <div className="or-opp">
                                                <span>or</span>{" "}
                                            </div>
                                            <div className="group-wrap">
                                                <div className="form-input login-input">
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        type="email"
                                                        name="email"
                                                        label="Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        onKeyDown={props.handleEnter}
                                                    />
                                                </div>
                                                <div className="form-input login-input">
                                                    {/* <i
                                                    onClick={() => this.setState({ showPass: !showPass })}
                                                    className={`${
                                                        showPass ? "far fa-eye" : "fal fa-eye-slash"
                                                    }`}
                                                    /> */}

                                                    <TextField
                                                        variant="outlined"
                                                        InputProps={{
                                                            inputProps: {
                                                                maxLength: 15,
                                                                minLength: 6,
                                                                autoComplete: "new-password",
                                                            },
                                                        }}
                                                        type={showPass ? "text" : "password"}
                                                        name="password"
                                                        label="Password*"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        onKeyDown={props.handleEnter}
                                                    />
                                                    <i
                                                        onClick={() => setShowPass(!showPass)}
                                                        className={`${showPass ? "far fa-eye" : "fal fa-eye-slash"}`}
                                                    />
                                                </div>
                                            </div>
                                            {status && <span className="error">{errorMsg}</span>}
                                            {/* <br /> */}
                                            <span
                                                className="checkbox-remember"
                                                onClick={() => {
                                                    setShowForgotPassword(true);
                                                    setShowInputForm(false)
                                                }}
                                                onKeyDown={props.handleEnter}
                                            >
                                                Forgot Password ?
                                            </span>

                                            <div className="sign-btn">
                                                <button className="shop-now">Log In</button>
                                            </div>
                                            <div className="already-ac">
                                                Don't have an account?&nbsp;
                                                <span onClick={() => props.switchScreen("sign-up")}>
                                                    Sign Up
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </>
                }
            </div>
        </div>
    );
};

export default Login;