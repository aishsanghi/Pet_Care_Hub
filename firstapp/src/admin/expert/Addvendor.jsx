import React, { useState } from "react";
import Sidebar_ from "../Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../../config";

const Addvendor = () => {
  const [formData, setformData] = useState({
    name: "",
    businessName: "",
    number: "",
    email: "",
    password: "",
    address: "",
    registrationNum: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();

    // const formDatanew = new FormData();
    // formDatanew.append("name", formData.name);
    // formDatanew.append("speciality", formData.speciality);
    // formDatanew.append("number", formData.number);
    // formDatanew.append("email", formData.email);
    // formDatanew.append("password", formData.password);

    try {
      const response = await axios.post(`${URL}/addvendor`, formData);
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          title: "Vendor Added Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
      setformData({
        name: "",
        businessName: "",
        number: "",
        email: "",
        password: "",
        address: "",
        registrationNum: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar_ />
      <div
        className="rightbox"
        style={{
          alignContent: "center",
          padding: "19px",
        }}
      >
        <div className="heading" style={{ display: "flex" }}>
          <h4>Add New Vendor</h4>
          <a
            href="/adminvendors"
            class="btn btn-sm btn-outline-primary ms-2 "
            role="button"
            aria-pressed="true"
            style={{ marginBottom: "10px" }}
          >
            View Vendors
          </a>
        </div>

        <div className="addsubsection">
          <form onSubmit={handlesubmit}>
            {/* <div>
              <input
                style={{ height: "38px" }}
                type="file"
                accept="image/*"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                // onChange={handlefile}
              />
            </div> */}
            <div>
              <label for="exampleInputEmail1" class="form-label">
                Enter Name
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                // id="exampleInputEmail1"
                // aria-describedby="emailHelp"
                name="name"
                value={formData.name}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="examplespeciality" class="form-label">
                Enter Business Name
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                id="examplespeciality"
                name="businessName"
                value={formData.businessName}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" class="form-label">
                Enter Number
              </label>
              <input
                style={{ height: "30px" }}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                name="number"
                value={formData.number}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Enter Email
              </label>
              <input
                style={{ height: "30px" }}
                type="email"
                class="form-control"
                id="exampleInputPassword1"
                name="email"
                value={formData.email}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Enter Password
              </label>
              <input
                style={{ height: "30px" }}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                name="password"
                value={formData.password}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Enter Address
              </label>
              <input
                style={{ height: "30px" }}
                type="textarea"
                class="form-control"
                id="exampleInputPassword1"
                name="address"
                value={formData.address}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Enter Registration Number
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="registrationNum"
                value={formData.registrationNum}
                onChange={handlechange}
              />
            </div>
            <button type="submit" class="btn btn-outline-primary">
              Add Vendor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addvendor;
