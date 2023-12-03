import React, { useEffect } from "react";
import ProductCard from '../Product/productCard';
import { Currency_icon, api_url } from '../../utils/constant';
import CountdownTimer from './CountDown';

const DealProduct = ({ data }) => {

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = (event) => {
        let left = document.getElementsByClassName("dash-deal-float")[0];
        let right = document.getElementsByClassName("dash-deal-2")[0];
        let el1 = left.getBoundingClientRect();
        let el2 = right.getBoundingClientRect();
        if (el1.top < 0 && !(el2.bottom < window.innerHeight)) {
            left.classList.add("image-sticky");
        } else {
            left.classList.remove("image-sticky");
        }
    };

    return (
        <div className="arrival-costumes">
            <div className="arrival-caption">
                <h2>{data.title}</h2>
                <p>{data.sub_title}</p>
            </div>
            <div style={{ width: '100%' }}>
                <div className="dash-deal-float">
                    <Deal_Card {...data.deal_product[0]} />
                </div>
                <div className={"popular-costumes seller-profile dash-deal-2"}>
                    {data.prod_list.slice(0, 12).map((prod_data, index) => (
                        <ProductCard key={index} {...prod_data} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DealProduct;

const Deal_Card = (data) => {
    const percentage = (symbol) => symbol ? `${(data.available / data.sold) * 100}%` : (data.available / data.sold) * 100;
    return (
        <div className="dash-deal-card">
            <h2>{data.headeing}</h2>
            <div className="img-div">
                <img src={api_url + `${data.image.original}`} alt="icon" />
            </div>
            <div className="deal-price">
                <span className="buy-info">
                    {Currency_icon} {data.sale_price}
                </span>
                <span className="old-price">
                    {Currency_icon}  {data.price}
                </span>
            </div>
            <div className="deal-name">{data.name}</div>
            <div><CountdownTimer /></div>
            <div>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated " role="progressbar" style={{ width: percentage("symbol") }} aria-valuenow={percentage()} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">SOLD : {data.sold}</div>
                <div className="col-6">AVAILABLE: {data.available}</div>
            </div>
        </div>
    );
};