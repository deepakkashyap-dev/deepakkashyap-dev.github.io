import React from "react";
const HeadLine = (props) => (
  <div className="header-area">
    <div className="container">
      <span className="text-bold">
        <i>
          <img src="/assets/images/money.png" alt="" />
        </i>
        &nbsp;Money Back Guarantee.
      </span>
      &nbsp;
      <span>
        Receive your item as described. Or your money back.{" "}
        <i className="fas fa-long-arrow-alt-up"></i>
      </span>
    </div>
  </div>
);

export default HeadLine;
