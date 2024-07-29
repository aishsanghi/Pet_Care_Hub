import React, { useEffect, useState } from "react";
import VendorSidebar from "./VendorSidebar";
import axios from "axios";
import URL from "../config";

const VendorDashboard = ({ loggeduser }) => {
  const [countcat, setcountcat] = useState(0);
  const [countpro, setcountpro] = useState(0);
  const [countorder, setcountorder] = useState(0);

  useEffect(() => {
    if (loggeduser && loggeduser._id) {
      handlecategory();
      handleproduct();
      handleorder();
    } else {
      console.error("loggeduser or loggeduser._id is undefined");
    }
  }, [loggeduser]);

  const handlecategory = async () => {
    const response = await axios.get(
      `${URL}/getcatByVendorId/${loggeduser._id}`
    );
    setcountcat(response.data.category.length);
  };

  const handleproduct = async () => {
    const response = await axios.get(
      `${URL}/getproByVendorId/${loggeduser._id}`
    );
    setcountpro(response.data.product.length);
  };

  const handleorder = async () => {
    const response = await axios.get(`${URL}/getOrder`);
    const orders = response.data.orderGet.filter((order) =>
      order.cartArray.some((item) => item.vendorId === loggeduser._id)
    );
    console.log("order", response.data.orderGet);
    setcountorder(orders.length);
  };

  return (
    <div className="dashboard">
      <VendorSidebar />
      <div className="rightbox">
        <div className="middlebox">
          <div class="card">
            <div class="card-body">
              <p>
                All Category <br />
                {countcat}
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Products <br />
                {countpro}
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Orders <br />
                {countorder}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
