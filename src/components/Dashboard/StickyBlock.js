import React, { useRef } from 'react';
import Icon, {
    GiftOutlined, GiftTwoTone,
    CalendarOutlined, CalendarTwoTone,
    StarOutlined, StarTwoTone,
    ShoppingOutlined, ShoppingTwoTone,
    WechatOutlined, MessageTwoTone
} from '@ant-design/icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RenderIcon = (data) => {
    switch (data.icon_name) {
        case "gift":
            return <GiftTwoTone style={{ fontSize: '45px', color: data.icon_color, background: "#fff" }} twoToneColor={data.icon_color} />;
        case "calendar":
            return <CalendarTwoTone style={{ fontSize: '45px', color: data.icon_color }} twoToneColor={data.icon_color} />;
        case "star":
            return <StarTwoTone style={{ fontSize: '45px', color: data.icon_color }} twoToneColor={data.icon_color} />;
        case "shopping":
            return <ShoppingTwoTone style={{ fontSize: '45px', color: data.icon_color }} twoToneColor={data.icon_color} />;
        case "chat":
            return <MessageTwoTone style={{ fontSize: '45px', color: data.icon_color }} twoToneColor={data.icon_color} />;
    }
}

const StickyBlock = (props) => {
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
        slidesToShow: 3,
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
        <div className="" style={{ width: "100%" }} >
            <Slider {...settings} ref={focusOut}>
                {
                    props.data.data.length > 0 &&
                    props.data.data.map(d => {
                        return (
                            <div key={d.id} style={{ width: "30%" }}>
                                <div className='d-flex' style={{
                                    background: props.data.background_color,
                                    margin: "0 7px",
                                    justifyContent: "center",
                                    // alignItems: "center"
                                }} >
                                    <div className=''>
                                        <div>
                                            <p>{d.title}</p>
                                        </div>
                                        <div>
                                            <p>{d.sub_title}</p>
                                        </div>
                                    </div>
                                    <div className='' style={{ background: "#fff" }}>
                                        {RenderIcon(d)}
                                    </div>
                                </div>
                            </div>
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