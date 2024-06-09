import React,{useEffect,useState} from 'react';
import { api_url } from '../../utils/constant';
import { getHomePageBlock_data } from '../../store/actions/dashboard';
import { useSelector, useDispatch } from "react-redux";

const commonStyle = {   position: "absolute", bottom: "10%", left: "50%",
padding: "0.5rem 2rem",transform: "translate(-50%, -50%)", borderRadius: "5px", border: "none", cursor: "pointer"};

const HeroImage = ({data}) => {
    const dispatch = useDispatch();
    const [imageData,setImageData] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        dispatch(getHomePageBlock_data(data.id)).then(res => setImageData(res))
        // return () => {
        //     setImageData([])
        // }
    }, [data])

    return (
        <div className="row mb-2 px-3 banner-section">
            {/* <div className="home-banner"> */}
            {
                imageData.length > 0 &&
                imageData.map(d =>
                    <div className={`p-0 col-lg-${d.width}`} key={d.id} style={{position: "relative"}} >
                        <img src={api_url + `${d.Banner_image}`} alt={d.Banner_name} style={{ height: "-webkit-fill-available" }} />
                        {
                            d.button_text && 
                                <button className='btn banner-btn' 
                                    style={{
                                        backgroundColor: isHovered ? d.button_background : d.button_background_hover,
                                        color: isHovered ? d.button_text_color : d.button_text_color_hover,
                                    }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    onClick={() =>  window.open(d.button_URL)} 
                                >
                                    {d.button_text}
                                </button>
                        }
                    </div>
                   )
            }
            {/* </div> */}
        </div >
    )
}
export default HeroImage;