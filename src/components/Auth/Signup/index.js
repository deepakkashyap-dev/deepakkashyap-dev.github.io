import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoginSocialGoogle, LoginSocialFacebook, LoginSocialApple } from 'reactjs-social-login';
import { FacebookLoginButton, GoogleLoginButton, AppleLoginButton } from 'react-social-login-buttons';
import Toast from "light-toast";
import { Helmet } from "react-helmet";
import {
    signUpRequest,
    socialLogin,
    showSignupErr,
    OTPVerify,
    loginRequest,
    resendMobileOTP,
    resendEmailLink,
} from "../../../store/actions/auth";
// import { detect } from "detect-browser";
import { SET_SIGNUP_USER_ERROR } from "../../../store/actionsTypes";
import { Select, TextField, InputLabel, FormControl, MenuItem } from "@mui/material";
// import OTPForm from './OTPform';
import { getProfileBannerInfo } from "../../../store/actions/profile";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import Select from 'react-select';
import { useDispatch } from 'react-redux';


const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDOB] = useState("");
    const [checkbox, setCheckbox] = useState(false);
    const [showInputForm, setShowInputForm] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [error, setError] = useState(false);
    const [status, setStatus] = useState("");
    const [showOTPform, setShowOTPform] = useState(false);
    const [OTP, setOTP] = useState("");
    const [token, setToken] = useState("");
    const [passNotMatch, setPassNotMatch] = useState();
    const [time] = useState(120);
    const [showCalendar, setShowCalendar] = useState(false);
    const [gender, setGender] = useState("");
    const [refferal_code, setRefferal_code] = useState("");
    const [ip, setIP] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchIP() {
            const res = await fetch("https://api.ipify.org?format=json");
            const resJson = await res.json()
            setIP(resJson.ip)
        }
        fetchIP()
    }, [])

    const updateEmail = (e) => {
        setEmail(e.target.value);
        setStatus(false);
        dispatch(showSignupErr({ type: SET_SIGNUP_USER_ERROR, payload: { errData: "", status: false } }));
    };

    const checkboxState = () => {
        setCheckbox(!checkbox);
        setError(false)
    };

    const signupCallback = (status) => {
        if (status.status) {
            console.log(status, "signup--status")
            Toast.hide();
            if (Object.keys(status.res).includes("mobileVerified") || Object.keys(status.res).includes("sentOtp")) {//if response contain {mobileVerified:false} ex mobile otp related 
                setShowOTPform(true);
                setToken(status.res.token)
            }
            props.addToast(status.res.message ? status.res.message : "OTP sent on your mobile and email", { appearance: "success" });
        } else {
            setErrorMsg(status.data.errData);
            setStatus(status.data.status);
            Toast.hide();
            props.addToast(status.data.errData, { appearance: "error" });
            // Toast.fail("SignUp Fail..", 1000);
        }
    }
    const formSubmit = (e) => {
        e.preventDefault();
        if (password2 !== password) {
            setPassNotMatch(true);
        } else if (checkbox) {
            setPassNotMatch(passNotMatch);
            Toast.loading("Loading...");
            // const browser = detect();
            const payload = {
                email, ip, password, mobile,
                first_name: firstName,
                last_name: lastName,
                login: false,
                // browser: browser.name,
                refferal_code, gender, dob
            };
            dispatch(signUpRequest(payload, signupCallback));
        } else {
            setError(true);
        }
    };

    const enterPhone = (e) => {
        let temp = e.target.value;
        let checkDigit = new RegExp(/^\d*$/);
        if (checkDigit.test(temp)) {
            setMobile(temp);
        }
    };

    const submitOTP = () => {
        const params = { otp: OTP, token }
        dispatch(OTPVerify(params, (callback) => {
            if (callback.data.status) {
                props.addToast(callback.data.message, { appearance: "success" }, () => {
                    props.closePopup();
                })
                // this.loginFunction();
            }
            else {
                props.addToast(callback.data.message, { appearance: "error" })
            }
        }))
    }

    const resendMobOTP = () => {
        dispatch(
            resendMobileOTP({ token }, (callback) => {
                props.addToast(callback.message, { appearance: "success" });
                // this.setState({ time: 120 })
            }))
    }

    const resendEmail = () => {
        dispatch(
            resendEmailLink({ token }, (callback) => {
                props.addToast(callback.message, { appearance: "success" });
                // this.setState({ time: 120 })
            })
        )
    }

    // const loginFunction = () => {
    //     Toast.loading("Loading...");
    //     const payload = { email, password };
    //     localStorage.setItem("rememberMe", true);
    //     localStorage.setItem("bazaarEmail", payload.email);
    //     localStorage.setItem("bazaarPass", payload.password);

    //     props.loginRequest(payload, (status) => {
    //         if (status.status) {
    //             props.getProfileBannerInfo();
    //             window.location.reload();
    //             Toast.success("Login Successfully", 500, () => {
    //                 props.closePopup();
    //             });
    //             props.addToast(status.data.errData, { appearance: "error" });
    //         }
    //     });
    // }

    const ChangeFormateDate = () => {
        const [dd, mm, yy] = dob.split(/-/g);
        return `${mm}-${dd}-${yy}`;
    };

    const setDateOfBirth = (props) => {
        const newDOB =
            props.getDate() +
            "-" +
            (props.getMonth() + 1) +
            "-" +
            props.getFullYear();
        setShowCalendar(!showCalendar);
        setDOB(newDOB);
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
                        //     // setState={(key, val) => this.setState({ [key]: val })}
                        //     submitOTP={submitOTP}
                        //     time={time}
                        //     resendMobOTP={resendMobOTP}
                        //     resendEmail={resendEmail}
                        // />
                        ""
                        :
                        <>
                            <div className="sign-img">
                                <div className="sign-opp-wrap">
                                    <img src={"/assets/images/authPageImage.jpeg"} alt="login" />
                                </div>
                            </div>
                            <div className="sign-form">
                                <form autoComplete="off" onSubmit={(e) => formSubmit(e)}>
                                    <div className="detail-from ">
                                        {/* <div className="user-detail-edit"> */}
                                        <h4 className="form-title">
                                            Sign up to <span>Difresca</span>
                                        </h4>
                                        {/* </div> */}
                                        <div className="group-wrap">
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type="text"
                                                    name="firstName"
                                                    label="First Name"
                                                    value={firstName}
                                                    onChange={(e) => { setFirstName(e.target.value); setStatus(false); }}
                                                    onKeyDown={props.handleEnter}
                                                />
                                            </div>
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type="text"
                                                    name="lastName"
                                                    label="Last Name"
                                                    value={lastName}
                                                    onChange={(e) => { setLastName(e.target.value); setStatus(false); }}
                                                    onKeyDown={props.handleEnter}
                                                />
                                            </div>
                                        </div>
                                        <div className="group-wrap">
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type="email"
                                                    name="email"
                                                    label="Email address"
                                                    value={email}
                                                    onChange={(e) => updateEmail(e)}
                                                    onKeyDown={props.handleEnter}
                                                />
                                            </div>
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    type="text"
                                                    required
                                                    InputProps={{
                                                        inputProps: {
                                                            maxLength: 10,
                                                            minLength: 10,
                                                            autoComplete: "new-password",
                                                        },
                                                    }}
                                                    label="Phone Number"
                                                    value={mobile}
                                                    onKeyDown={props.handleEnter}
                                                    onChange={(e) => enterPhone(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="group-wrap">
                                            <FormControl className="form-input">
                                                <InputLabel variant="outlined" >Gender</InputLabel>
                                                <Select
                                                    required
                                                    variant="outlined"
                                                    value={gender}
                                                    label="Gender"
                                                    onChange={(e) => setGender(e.target.value)}
                                                >
                                                    <MenuItem value={"Male"}>Male</MenuItem>
                                                    <MenuItem value={"Female"}>Female</MenuItem>
                                                    <MenuItem value={"Others"}>Other</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type="text"
                                                    name="dob"
                                                    readOnly
                                                    placeholder="Date of Birth"
                                                    value={dob}
                                                    onClick={() => setShowCalendar(!showCalendar)}
                                                    onKeyDown={props.handleEnter}
                                                />
                                                <i
                                                    onClick={() => setShowCalendar(!showCalendar)}
                                                    className="toggle-password fas fa-calendar-alt"
                                                />
                                                {showCalendar && (
                                                    <div className="popCalendar">
                                                        <Calendar
                                                            onChange={setDateOfBirth}
                                                            minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 120))}
                                                            maxDate={new Date()}
                                                            value={
                                                                dob
                                                                    ? new Date(ChangeFormateDate())
                                                                    : new Date("01-01-2000")
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="group-wrap">
                                            <div className="form-input">
                                                <i onClick={() => setShowPass(!showPass)} className={`${showPass ? "fal fa-eye" : "far fa-eye-slash"}`} />
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type={showPass ? "text" : "password"}
                                                    name="password"
                                                    label="Password"
                                                    value={password}
                                                    InputProps={{
                                                        inputProps: {
                                                            maxLength: 15,
                                                            minLength: 6,
                                                            autoComplete: "new-password",
                                                        },
                                                    }}
                                                    onChange={(e) => { setPassword(e.target.value); setStatus(false); }}
                                                    onKeyDown={props.handleEnter}
                                                />
                                                <i onClick={() => setShowPass(!showPass)} className={`${showPass ? "fal fa-eye" : "far fa-eye-slash"}`} />
                                            </div>
                                            <div className="form-input">
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    type={"text"}
                                                    name="password2"
                                                    label="Confirm password"
                                                    value={password2}
                                                    InputProps={{
                                                        inputProps: {
                                                            maxLength: 15,
                                                            minLength: 6,
                                                            autoComplete: "new-password",
                                                        },
                                                    }}
                                                    onChange={(e) => { setPassword2(e.target.value); setStatus(false); }}
                                                    onKeyDown={props.handleEnter}
                                                />
                                            </div>
                                        </div>
                                        {passNotMatch && password2 !== password && (
                                            <span className="error">
                                                Password and Confirm Password doesn't match{" "}
                                            </span>
                                        )}
                                        <div className="cond">
                                            <input
                                                type="checkbox"
                                                checked={checkbox}
                                                onChange={checkboxState}
                                                onKeyDown={props.handleEnter}
                                            />{" "}
                                            I agree to Difresca{" "}
                                            <Link target="_blank" to={{ pathname: "/policy", param: "Term & Condition" }}  >
                                                Terms of Service
                                            </Link>
                                            &nbsp;and{" "}
                                            <Link target="_blank" to={{ pathname: "/policy", param: "Privacy" }} >
                                                Privacy
                                            </Link>
                                            .
                                            {error && (
                                                <div className="error">
                                                    Please Accept Term And Conditions{" "}
                                                </div>
                                            )}
                                        </div>
                                        {status && <span className="error">{errorMsg}</span>}
                                        <div className="sign-btn">
                                            <button className="shop-now">Sign up </button>
                                        </div>

                                        <div className="already-ac">
                                            Already have an account?&nbsp;
                                            <span onClick={() => props.switchScreen("login")}>
                                                Log In
                                            </span>
                                        </div>
                                        <hr />
                                        {/* <div className="sign-opp-wrap"> */}
                                        {/* <div className="google-button-holder"> */}
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
                                        {/* </div> */}
                                    </div>
                                </form>
                            </div>
                        </>
                }

            </div>
        </div >
    );
}

export default Signup;

