import React from "react";
const TableHead = () =>{
    return(
        <tr className="main-heading">
            <th className="custome-checkbox start pl-30" colSpan='2'>Product</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Subtotal</th>
            <th scope="col" className="end">Remove</th>
        </tr>
    )
}
export default TableHead;