import React, { useEffect, useState } from "react";
import Sidebar_ from "./Sidebar_";
import axios from "axios";
import URL from "../config";
const Dashboard = () => {
  const [countcat, setcountcat] = useState(0);
  const [countpro, setcountpro] = useState(0);
  const [countorder, setcountorder] = useState(0);
  const [countuser, setcountuser] = useState(0);
  const [countvendor, setcountvendor] = useState(0);
  const [countquery, setcountquery] = useState(0);

  useEffect(() => {
    handlecategory();
    handleproduct();
    handleorder();
    handleuser();
    handlevendor();
    handlequery();
  }, []);

  const handlecategory = async () => {
    const response = await axios.get(`${URL}/getCategory`);
    setcountcat(response.data.categoryGet.length);
  };

  const handleproduct = async () => {
    const response = await axios.get(`${URL}/getproduct`);
    setcountpro(response.data.productGet.length);
  };

  const handleorder = async () => {
    const response = await axios.get(`${URL}/getOrder`);
    setcountorder(response.data.orderGet.length);
  };

  const handleuser = async () => {
    const response = await axios.get(`${URL}/getusers`);
    setcountuser(response.data.userGet.length);
  };

  const handlevendor = async () => {
    const response = await axios.get(`${URL}/getvendor`);
    setcountvendor(response.data.vendorGet.length);
  };

  const handlequery = async () => {
    const response = await axios.get(`${URL}/getcontact`);
    setcountquery(response.data.contactGet.length);
  };

  return (
    <div className="dashboard">
      <Sidebar_ />
      <div className="rightbox">
        <div className="dashboard">
          <div class="card">
            <div class="card-body">
              <p>
                All Category <br />[{countcat}]
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Products <br />[{countpro}]
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Orders <br />[{countorder}]
              </p>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <div class="card">
            <div class="card-body">
              <p>
                All Users <br />[{countuser}]
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Vendors <br />[{countvendor}]
              </p>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <p>
                All Queries <br />[{countquery}]
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
