import React, { useEffect } from 'react';
import ProductCard from '../Product/productCard';
import { useSelector, useDispatch } from 'react-redux';
import { getHomePageBlock_data } from '../../store/actions/dashboard';
import { SeeAll } from '../../utils/seeAll';
const CategoryProduct = ({ data }) => {
    const dispatch = useDispatch();
    const prod_list  = useSelector((state) => state.dashboardInfoReducer[data.block_name]);
    useEffect(() => {
        dispatch(getHomePageBlock_data(data.id,data.block_name)); // get product list of a particular block or section
    }, [data]);
    return (
        <div className="arrival-costumes">
            <div className="arrival-caption">
                <h2>{data.heading}</h2>
                <p>{data.sub_Heading}</p>
            </div>
            <div className="popular-costumes seller-profile">
             {/* {prod_list.slice(0, 12).map((prod_data, index) => ( */}
                {prod_list && prod_list.slice(0,20).map((prod_data, index) => (
                    <ProductCard key={index} {...prod_data} />
                ))}
                { prod_list && prod_list.length > 1 &&   <SeeAll linkTo={prod_list[0].section}/>}
            </div>
        </div>
    );

};
export default CategoryProduct;