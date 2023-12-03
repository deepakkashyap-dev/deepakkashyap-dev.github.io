import React, { useRef } from 'react';
import ProductCard from '../Product/productCard';

const CategoryProduct = ({ data }) => {
    return (
        <div className="arrival-costumes">
            <div className="arrival-caption">
                <h2>{data.title}</h2>
                <p>{data.sub_title}</p>
            </div>
            <div className="popular-costumes seller-profile">
                {data.prod_list.slice(0, 12).map((prod_data, index) => (
                    <ProductCard key={index} {...prod_data} />
                ))}
            </div>
        </div>
    );

};
export default CategoryProduct;