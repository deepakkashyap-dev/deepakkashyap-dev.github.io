import React from "react";
import { Link } from "react-router-dom";

// import { apiUrl } from "../../../utils/urlEndpoints";
// import { axiosInstance } from "../../../utils/Service";

const ProfileDropDown = (props) => {
    const [status, setStatus] = React.useState(true);


    // React.useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     axiosInstance
    //         .post(apiUrl.profile.profileBannerInfo, {
    //             headers: {
    //                 Authorization: "Bearer " + token,
    //             },
    //         })
    //         .then((res) => {
    //             setStatus(res.data.userdata.verified);
    //         });
    // }, []);
    return (
        <div className="userName-container">
            <div className="signin-register">
                <span className="profile-name">Hi {props.userName}</span>
            </div>

            <div className="logout-container">
                {status === "verified" ? (
                    <div>
                        <Link
                            to={{
                                pathname: "/profile/seller/dashboard",
                                //state: { tab: "MyDashboard" },
                            }}
                            onClick={props.setValue}
                        >
                            Seller Dashboard
                        </Link>
                    </div>
                ) : null}

                <div>
                    <Link
                        to={{
                            pathname: "/profile",
                            // state: { tab: "BasicInfo" },
                        }}
                        onClick={props.setValue}
                    >
                        My Profile
                    </Link>
                </div>

                <div>
                    <Link
                        to={{
                            pathname: "/profile/change-password",
                            // state: { tab: "BasicInfo" },
                        }}
                        onClick={props.setValue}
                    >
                        Change Password
                    </Link>
                </div>

                {/* <div>
                        <Link to="/mycoupon" onClick={props.setValue}>
                          My Coupon
                        </Link>
                      </div> */}
                <div onClick={props.logout}>
                    <span className="logout-link">Log Out</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileDropDown;
