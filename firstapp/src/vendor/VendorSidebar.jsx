import React from "react";

const VendorSidebar = () => {
  return (
    <div className="side_box">
      <div className="leftbox">
        <ul>
          <li className="libox">
            <a href="/vendor" class="btn btn-default btn-md">
              <i class="fa fa-home fa-lg"></i>
              Dashboard
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/vendorcategory" class="btn btn-default btn-md">
              <i class="fa fa-navicon"></i>
              Category
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/vendorproduct" class="btn btn-default btn-md">
              <i class="fa fa-paw"></i>
              Product
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/vendorOrder" class="btn btn-default btn-md">
              <i class="fa fa-shopping-cart fa-lg"></i>
              Orders
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VendorSidebar;
