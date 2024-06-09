            
import React, { useEffect,useState } from "react";
import ProductCard from "./productCard";
import SkeletonLoader from "tiny-skeleton-loader-react";
import { isEmpty, isEqual, xorWith, find, forOwn, filter } from "lodash";
import queryString  from "query-string";
import { Link, useLocation } from "react-router-dom";
import{getProducts} from "../../store/actions/dashboard";
// import { apiElements } from "../../utils/constants";
// import { ButtonLoader } from "../../utils/constants";

const validParams = ['id','category','subcategory','block']

const Product = (props) => {
    const location = useLocation();
    const [data, setData] = useState({});
    const [loader, setIsLoading] = useState(false);
   
    useEffect(()=>{
        window.scrollTo(0, 0);
        setIsLoading(true)
        const urlParams = queryString.parse(location.search);
        const isValid = Object.keys(urlParams).every(param => validParams.includes(param));
        if(isValid){
            getProducts(location.pathname+"/"+location.search)
              .then((res)=>setData(res.data))
              .catch(()=>setIsLoading([]));
          setIsLoading(false)
        }
    },[]);
    return(
      <div className="container-fluid px-3 arrival-costumes">
        {
          data.head && !loader ? 
            <div className="arrival-caption">
                <h2>{data.head.heading}</h2>
                <p>{data.head.sub_heading}</p>
            </div>
            :
            <>
              <div className="skeleton-head">
                {[0, 1].map(() => (
                  <SkeletonLoader
                      width="50%"
                      height="20px"
                      style={{ margin: "10px"}}
                    />
                ))}
              </div>
            </>
        }
        <div className="popular-costumes seller-profile">
            {(data.products?.length > 0) && !loader ? (
                data.products.map((item, i) => <ProductCard key={i} {...item} />)
            ) : (
            <React.Fragment>
              {[0, 1, 2, 3, 4, 5, 6].map(() => (
                <SkeletonLoader
                  width="18%"
                  height="20em"
                  style={{ margin: "1%"}}
                />
              ))}
            </React.Fragment>
          )}
        </div>

        {/* suggetsion products */}
        {(data.suggestion_products?.length > 0) && !loader && (
          <>
            <div className="suggestion-head">
                <h2>More Suggestions</h2>
            </div>
            <div className="popular-costumes seller-profile">
              { data.suggestion_products.map((item, i) => <ProductCard key={i} {...item} />)}
            </div>
          </> 
        )}
      </div>
    );
};
export default Product;