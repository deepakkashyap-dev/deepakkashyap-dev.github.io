import React from "react";
import HeaderSearch from "./headerSearch";
import ProfileDropDown from "./profileDropdown";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setLoginPopupStatus } from '../../../store/actions/general';
// import { parse } from "query-string";
// import { get } from 'lodash';

const MainHeader = (props) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const { loggedUserInfo } = useSelector((state) => state.userProfile);

    return (
        <div className="header-login">
            <div className="container-fluid px-3">
                <div className="login">
                    <div>
                        <span className="logo-class" onClick={props.goToHome}>
                            <img src={"/assets/images/logo.png"} width={50} alt="diFresca" />
                        </span>
                    </div>
                    <HeaderSearch />
                    {/* <div className="header-address" onClick={() => props.openLocationPopup({ locationPopup: true })}>
                        <div className="product-location-wraps">
                            <div className="product-location">
                                <div className="location-mark">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <div className="location-text">
                                        <div className="deliver-text">Deliver to</div>
                                        <div className="wrap-delivery">
                                            <div className="delivery-text">
                                                {query.category === "Local" && query.zip ?
                                                    (get(userLocation, ["cityArr", [0]], '')) :
                                                    (props.browser_location.isGeolocationEnabled && userLocation.streetAdddr ?
                                                        userLocation.streetAdddr :
                                                        "Select location"
                                                    )
                                                }
                                            </div>
                                            <div className="deliver-zip">
                                                {query.category === "Local" && query.zip ?
                                                    query.zip :
                                                    props.browser_location.isGeolocationEnabled && userLocation.streetAdddr ?
                                                        userLocation.pinCode[0] :
                                                        ""
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="distance-mark">
                                    30 miles + Shipping
                                    <i className="fas fa-shipping-fast"></i>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="signup-register">
                        <div className="cart-wrap">
                            <Link
                                to="/cart"
                                // onClick={props.setValue}
                                className="wish-list msg-number"
                            // data-count={props.cartLength <= 99 ? props.cartLength : '99+'}
                            >
                                {/* <div className="tooltip">Cart</div> */}
                                <i className="fas fa-shopping-bag"></i>
                                <div>Cart</div>
                            </Link>
                        </div>
                        {loggedUserInfo.isLoggedIn ? (
                            <ProfileDropDown
                                userName={loggedUserInfo.userName}
                                setValue={loggedUserInfo.setValue}
                                logout={loggedUserInfo.logout}
                            // userProfileBanner={loggedUserInfo.userProfileBanner}
                            />
                        ) : (
                            <div style={{ display: "flex" }}>
                                <div className="signin-register" style={{ paddingRight: "20px" }}>
                                    <span
                                        onClick={() => dispatch(setLoginPopupStatus(true))}
                                        className="header-text"
                                    >
                                        Sign In
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MainHeader;
