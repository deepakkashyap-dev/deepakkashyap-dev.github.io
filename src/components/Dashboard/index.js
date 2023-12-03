import React, { useState, useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getHomePageBlocks } from '../../store/actions/dashboard';
import { BallTriangleLoader } from "../../utils/loaders";
import HeroImage from './HeroImage';
import StickyBlock from './StickyBlock';
import CategoryProduct from './categoryProduct';
import BrandBanner from "./BrandBanner";
// const HeroImage = lazy(() => import('./HeroImage'));


const block_name = {
    CATEGORY_PROD: "category-product",
    HERO_IMAGE: "hero-image",
    STICKY_NOTES: "sticky-notes",
    BRAND_BANNER: "brand-banner",
}

const dynamicRender = (data, index) => {
    switch (data.block_name) {
        case block_name.HERO_IMAGE:
            return <HeroImage data={data} key={index} />;
        case block_name.CATEGORY_PROD:
            console.log(data, "data.block_name")

            if (!data.editor_pick) {
                return <CategoryProduct data={data} key={index} />;
            }
        // else {
        //     return <EditorsPick data={data} />;
        // }
        case block_name.STICKY_NOTES:
            return <StickyBlock data={data} key={index} />;
        case block_name.BRAND_BANNER:
            return <BrandBanner data={data} key={index} />;
        // case "brands":
        //     return <DiscoverBrands data={data} />;
        // case "review":
        //     return <ReviewPage data={data} />;
        default:
            return null;
    }
};

const Dashboard = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);
    const { dashboardBlockData } = useSelector((state) => state.dashboardInfo);

    useEffect(() => {
        setTimeout(() => {
            dashboardBlockData && setLoader(false)
        }, 2000);
        window.scrollTo(0, 0);
        dispatch(getHomePageBlocks());
    }, []);


    // const { dashboardBlockData } = useSelector((state) => state.dashboardInfo);

    // if (loader) {
    //     return <BallTriangleLoader Style={"bg-white"} />
    // }
    return (
        <div className={"container-fluid px-3"}>
            {
                dashboardBlockData.length &&
                dashboardBlockData.map((data, index) => dynamicRender(data, index))
            }
            {/* <div> <Banner /></div> */}
        </div>
    );
};
export default Dashboard;