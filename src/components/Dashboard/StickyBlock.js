import React, { useRef,useEffect,useState } from 'react';
import { api_url } from '../../utils/constant';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHomePageBlock_data } from '../../store/actions/dashboard';
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';

const StickyBlock = ({data}) => {
    const focusOut = useRef(null);
    const dispatch = useDispatch();
    const [stickyData,setStickyData] = useState([]);
    useEffect(() => {
        dispatch(getHomePageBlock_data(data.id)).then(res => setStickyData(res))
        // return () => {
        //     setStickyData([])
        // }
    }, [data])
    var settings = {
        className: "sticky-style",
        // style: { marginRight: "16px" },
        // background:props.data.background_color,
        centerPadding: "60px",
        // centerMargin: "60px",
        dots: false,
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: data.Card_In_A_Row ? parseInt(data.Card_In_A_Row) : 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            // {
            //     breakpoint: 945,
            //     settings: {
            //         slidesToShow: 3,
            //         slidesToScroll: 1,
            //     },
            // },
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
        <div style={{ width: "100%" }} >
            <Slider {...settings} ref={focusOut}>
                {
                    stickyData.length > 0 &&
                    stickyData.map(d => {
                        return (
                            <Link to={d.button_URL} key={d.id}  style={{ width: "30%" }}>
                                <img className='sticky-bnr' src={api_url + `${d.Banner_image}`} alt={d.Banner_name}  />
                            </Link>
                        )
                    }
                    )

                }
            </Slider >
        </div >
    )
}
export default StickyBlock;

{/* <div className="" style={{ width: "100%" }} >
<Slider {...settings} ref={focusOut}>
    {
        props.data.data.length > 0 &&
        props.data.data.map(d => {
            return (
                <div key={d.id}>
                    <div className='d-flex' style={{
                        background: props.data.background_color,
                        margin: "0 7px",
                        justifyContent: "center",
                        // alignItems: "center"
                    }} >
                        <div className='col-9'>
                            <div>
                                <p>{d.title}</p>
                            </div>
                            <div>
                                <p>{d.sub_title}</p>
                            </div>
                        </div>
                        <div className='col-3' style={{background:"#fff" }}>
                            <div style={{ }}>
                                {RenderIcon(d)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        )

    }
</Slider >
</div > */}