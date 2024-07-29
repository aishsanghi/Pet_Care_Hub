import React, { useState } from "react";
import register_icon from "./images/supplier.webp";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import URL from "../config";

const RegisterVendor = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNum: "",
    name: "",
    businessName: "",
    number: "",
    email: "",
    password: "",
    address: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();

    if (formData.number.length !== 10) {
      Swal.fire({
        title: "Invalid number",
        text: "number should be of 10 digits",
        icon: "warning",
      });
      return;
    }

    if (formData.registrationNum.length !== 6) {
      Swal.fire({
        title: "Invalid Registration Number",
        text: "number should be of 6 digits",
        icon: "warning",
      });
      return;
    }

    try {
      console.log("formData:", formData);
      const response = await axios.post(`${URL}/addvendor`, formData);
      if (response) {
        Swal.fire({
          title: "Succesfully Registered ",
          text: response.data.message,
          icon: "success",
        });
      }

      navigate("/loginVendor");
    } catch (error) {
      Swal.fire({
        title: "Warning",
        text: error.message,
        icon: "warning",
      });
    }
  };

  return (
    <div className="contain_register">
      <div className="contact_body">
        <p className="text-muted text-center">Register</p>
        <h3 className="text-center">
          Create an<span className="text-primary "> Account</span>
        </h3>
      </div>
      <div className="register_box">
        <div className="m-auto">
          <img className="register_img" src={register_icon} />
        </div>
        <div className="register_form m-auto">
          <form onSubmit={handlesubmit}>
            <div className="input-group_reg mb-3">
              <input
                name="registrationNum"
                value={formData.registrationNum}
                type="text"
                onChange={handlechange}
                className="form-control"
                required
                placeholder=" Enter Registration Number"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="name"
                value={formData.name}
                type="text"
                onChange={handlechange}
                className="form-control"
                required
                placeholder="Enter your Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="businessName"
                value={formData.businessName}
                type="text"
                onChange={handlechange}
                className="form-control"
                required
                placeholder=" Enter your Business Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="number"
                value={formData.number}
                type="text"
                onChange={handlechange}
                className="form-control"
                required
                placeholder=" Enter your Number"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handlechange}
                className="form-control"
                required
                placeholder="Enter your Email-id"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="password"
                value={formData.password}
                type="password"
                onChange={handlechange}
                className="form-control"
                required
                placeholder="Enter Password"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3">
              <input
                name="address"
                value={formData.address}
                type="text area"
                onChange={handlechange}
                className="form-control"
                required
                placeholder="Enter Address"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>

            <div className="col-9">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendor;
