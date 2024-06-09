import React from "react";
const TableData = (props) =>{
    console.log(props,"-props")
    return(
        <tr>
            <td className="image product-thumbnail">
                <img src={props.img}/>
            </td>
            <td className="product-des product-name">
                {props.brand && (<span className="brandName">{props.brand}</span>)}   
                <h6 className="product-name">
                    <a href="/products">{props.title}</a>
                </h6>
                {/* <div className="product-rate-cover">
                    <div className="product-rate d-inline-block">
                        <div className="product-rating" style={{width: "90%"}}> </div>
                    </div>
                    <span className="font-small ml-5 text-muted"> (4.0)</span>
                </div> */}
            </td>
            <td className="price" data-title="Price">
                <h4 className="text-brand">$150</h4>
            </td>
            <td className="text-center detail-info" data-title="Stock">
                <div className="detail-extralink mr-15">
                    <div className="detail-qty border radius ">
                        <a className="qty-down"><i className="fi-rs-angle-small-down"></i> </a>
                        <span className="qty-val">1</span>
                        <a className="qty-up"><i className="fi-rs-angle-small-up"> </i></a>
                    </div>
                </div>
            </td>
            <td className="text-right" data-title="Cart">
                <h4 className="text-body">$150</h4></td>
                <td className="action" data-title="Remove">
                <a className="text-muted"><i className="fi-rs-trash"></i></a>
            </td>
        </tr>
    )
}
export default TableData;