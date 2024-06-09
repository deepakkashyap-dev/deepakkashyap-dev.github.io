import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isEmpty, get } from "lodash";

const Footer = (props) => {
    const { sections, subSection, address, userData } = props;
    return (
        <div>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        {/* <li >  <Link   to={{  pathname: `/}`,  param: " k.slu",  }}   >   {"title"}   </Link>  </li> */}
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="widget company-intro-widget">
                                <Link to="/" className="site-logo">
                                    <img className="footer-logo" src={"/assets/images/logo.png"} alt="diFresca" />
                                    <span>diFresca</span>
                                </Link>
                                <p className="footer-content">We offer high-quality foods and the best delivery service, and the food market you can blindly trust.</p>
                            </div>
                        </div>  
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <h5 className="footer-list-head">About Us</h5>
                            <div className="footer-link-list">
                                <div>About us</div>
                                <div>Contact us</div>
                                <div>About team</div>
                                <div>Customer Support</div>
                            </div>
                        </div>      
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <h5 className="footer-list-head">Our Information</h5>
                            <div className="footer-link-list">
                                <div>Privacy policy update</div>
                                <div>Terms & conditions</div>
                                <div>Return Policy</div>
                                <div>Site Map</div>
                            </div>
                        </div>      
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <h5 className="footer-list-head">Community</h5>
                            <div className="footer-link-list">
                                <div>Announcements</div>
                                <div>Answer center</div>
                                <div>Discussion boards</div>
                                <div>Giving works</div>
                            </div>
                        </div>  
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <h5 className="footer-list-head">Subscribe Now</h5>
                            <div className="footer-link-list">
                                <div>Subscribe your email for newsletter and featured news based on your interest.</div>
                            </div>
                            <form className="subs-form">
                                <span>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]"><g clipPath="url(#clip0)"><path d="M16.3125 2.25H1.68751C0.75696 2.25 0 3.00696 0 3.93751V14.0625C0 14.9931 0.75696 15.75 1.68751 15.75H16.3125C17.243 15.75 18 14.9931 18 14.0625V3.93751C18 3.00696 17.243 2.25 16.3125 2.25ZM16.3125 3.375C16.3889 3.375 16.4616 3.39085 16.5281 3.41854L9 9.94319L1.47188 3.41854C1.53834 3.39089 1.61105 3.375 1.68747 3.375H16.3125ZM16.3125 14.625H1.68751C1.37715 14.625 1.125 14.3729 1.125 14.0625V4.60711L8.6314 11.1127C8.73743 11.2044 8.86872 11.25 9 11.25C9.13128 11.25 9.26256 11.2044 9.3686 11.1127L16.875 4.60711V14.0625C16.875 14.3729 16.6228 14.625 16.3125 14.625Z" fill="#B3B3B3"></path></g></svg>
                                </span>
                                <div>
                                    <input id="subscription-email" 
                                        placeholder="Write your email here"
                                        className="py-2 px-5 border rounded"
                                        type="email" 
                                    name="email"/>
                                </div>
                                <button className='' aria-label="Subscribe Button">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] 2xl:w-5 h-[18px] 2xl:h-5 rtl:rotate-180"><g clipPath="url(#clip0)"><path d="M18.809 8.21633L2.67252 1.52062C1.99272 1.23851 1.22471 1.36262 0.668264 1.84434C0.111818 2.32613 -0.120916 3.06848 0.0609589 3.78164L1.49725 9.41414H8.52951C8.85311 9.41414 9.11549 9.67648 9.11549 10.0001C9.11549 10.3237 8.85315 10.5861 8.52951 10.5861H1.49725L0.0609589 16.2186C-0.120916 16.9318 0.111779 17.6741 0.668264 18.1559C1.22584 18.6386 1.99393 18.7611 2.67256 18.4796L18.809 11.7839C19.5437 11.4791 20.0001 10.7955 20.0001 10.0001C20.0001 9.20469 19.5437 8.52113 18.809 8.21633Z" fill="#02B290"></path></g><defs><clipPath id="clip0"><rect width="20" height="20" fill="white"></rect></clipPath></defs></svg>
                                </button>
                            </form>
                        </div>             
                    </div>

                    {/* <div className="footer-box footer-logowrap">
              <img src="/assets/images/footer-logo.png" alt={"shops's logo"} />
            </div> */}
                </div>

                <div className="copyright-block">
                    <span className="copyright-info">
                        Copyright © 2024 diFresca, Inc.
                    </span>
                    <div className="media">
                        {!isEmpty(address) &&
                            <div className="footer-address">
                                {address[0].address},&nbsp;
                                {address[1].landmark},&nbsp;
                                {address[2].city},&nbsp;
                                {address[3].zip}
                            </div>
                        }
                        <div className="footer-social">
                            <a className="fb-link" href="https://www.facebook.com/" target="_blank">
                                {/* <i className="icon-fb">&nbsp;</i>{" "} */}
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="twitter-link" href="https://twitter.com/?lang=en" target="_blank">
                                {/* <i className="icon-twitter">&nbsp;</i>{" "} */}
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a className="insta-link" href="https://www.instagram.com/" target="_blank">
                                {/* <i className="icon-insta">&nbsp;</i>{" "} */}
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Footer;

// const mapStateToProps = (state, ownProps) => ({
//   sections: state.getCMS_data.section.section_data
//     ? state.getCMS_data.section.section_data
//     : null,
//   subSection: state.getCMS_data.section.subSection_data
//     ? state.getCMS_data.section.subSection_data
//     : null,
//   address: state.getCMS_data.address,
//   userData: state.userProfile.userProfileBanner,

// });

// export default withRouter(connect(mapStateToProps)(Footer));
