import React from "react";

const Sidebar_ = () => {
  return (
    <div className="side_box">
      <div className="leftbox">
        <ul>
          <li className="libox">
            <a href="/admin" class="btn btn-default btn-md">
              <i class="fa fa-home fa-lg"></i>
              Dashboard
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/category" class="btn btn-default btn-md">
              <i class="	fa fa-navicon"></i>
              Category
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/products" class="btn btn-default btn-md">
              <i class="fa fa-paw"></i>
              Products
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/allorders" class="btn btn-default btn-md">
              <i class="fa fa-shopping-cart fa-lg"></i>
              Orders
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/allusers" class="btn btn-default btn-md">
              <i class="fa fa-users fa-lg"></i>
              Users
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/adminvendors" class="btn btn-default btn-md">
              <i class="fa fa-user"></i>
              Vendors
            </a>
          </li>
          <li className="libox">
            {" "}
            <a href="/allqueries" class="btn btn-default btn-md">
              <i class="fa fa-headphones fa-lg"></i>
              Queries
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar_;
