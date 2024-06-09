import React, { useState, useEffect, Suspense, lazy } from "react";
import './style.css';
import { useSelector, useDispatch } from "react-redux";
import { getHomePageBlocks } from '../../store/actions/dashboard';
import { BallTriangleLoader } from "../../utils/loaders";
import HeroImage from './HeroImage';
import StickyBlock from './StickyBlock';
import CategoryProduct from './categoryProduct';
import BrandBanner from "./BrandBanner";
import DealProduct from './DealProduct';
// const HeroImage = lazy(() => import('./HeroImage'));

const block_name = {
    CATEGORY_PROD: "CATEGORY_PRODUCT",
    HERO_IMAGE: "HERO_IMAGE",
    STICKY_NOTES: "STICKY_NOTES",
    BRAND_BANNER: "brand-banner",
}



const Dashboard = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const { dashboardBlockData } = useSelector((state) => state.dashboardInfoReducer);

    useEffect(() => {
        setTimeout(() => {
            dashboardBlockData && setLoader(false)
        }, 2000);
        window.scrollTo(0, 0);
        dispatch(getHomePageBlocks());
    }, []);

    return (
        <div className="dashboard">
            {loader && <BallTriangleLoader Style={"bg-white"} />}
            <div className={"container-fluid px-3"}>
                {
                    dashboardBlockData.length &&
                    dashboardBlockData.map((data, index) => dynamicRender(data, index))
                }
            </div>
        </div>
    );
};

const dynamicRender = (data, index) => {
    switch (data.type) {
        case block_name.HERO_IMAGE: 
            return <HeroImage data={data} key={data.sequence} />;
        case block_name.CATEGORY_PROD:
            if (!data.is_deal) {
                return <CategoryProduct data={data} key={data.sequence} />;
            }
            else {
                return <DealProduct data={data} key={data.sequence} />;
            }
        case block_name.STICKY_NOTES:
            return <StickyBlock data={data} key={data.sequence} />;
        // case block_name.BRAND_BANNER:
        //     return <BrandBanner data={data} key={data.sequence} />;
        // case "brands":
        //     return <DiscoverBrands data={data} />;
        // case "review":
        //     return <ReviewPage data={data} />;
        default:
            return null;
    }
};
export default Dashboard;