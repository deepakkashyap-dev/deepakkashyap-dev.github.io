import React from 'react';
import { api_url } from '../../utils/constant';

const HeroImage = (props) => {
    return (
        <div className="row mb-4">
            {/* <div className="home-banner"> */}
            {
                props.data.data.length > 0 &&
                props.data.data.map(d =>
                    <div className={`col-lg-${d.width}`} key={d.id} >
                        <img src={api_url + `${d.img_url}`} alt={d.img_name} style={{ height: "-webkit-fill-available" }} />
                    </div>
                )

            }
            {/* </div> */}
        </div >
    )
}
export default HeroImage;