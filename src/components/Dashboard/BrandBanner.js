import React, { useRef } from "react";
import { api_url } from '../../utils/constant';
import Slider from "react-slick";

const BrandBanner = (props) => {
    const focusOut = useRef(null);
    var settings = {
        className: "sticky-style",
        // style: { marginRight: "16px" },
        // background:props.data.background_color,
        centerPadding: "60px",
        // centerMargin: "60px",
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: props.data.cardInRow,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="row mb-4">
            {/* <div className="home-banner"> */}
            <Slider {...settings} ref={focusOut}>
                {
                    props.data.data.length > 0 &&
                    props.data.data.map(d =>
                        <div className={""} key={d.id} style={{ width: "30%" }} >
                            <div style={{
                                margin: "0 7px",
                                justifyContent: "center",
                            }}>
                                <img src={api_url + `${d.img_url}`} alt={d.img_name} style={{ height: "-webkit-fill-available" }} />
                            </div>
                        </div>
                    )

                }
            </Slider >
            {/* </div> */}
        </div >
    );
};
export default BrandBanner;