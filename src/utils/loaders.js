import React from "react";
import { BallTriangle } from "react-loader-spinner";

export const BallTriangleLoader = (props) => (
    <div className={"spinner-container " + (props.Style ? props.Style : "")}>
        <BallTriangle
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            height={100}
            width={100}
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}
            timeout={props.time ? props.time : 3000} //3 secs
        />
    </div>
);