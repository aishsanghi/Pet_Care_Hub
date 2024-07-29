import React, { useState } from "react";
import axios from "axios";
import register_icon from "./images/register_icon.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import URL from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    password: "",
    confirm_pass: "",
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

    if (formData.password !== formData.confirm_pass) {
      Swal.fire({
        title: "Invalid password",
        text: "passwords do not match",
        icon: "warning",
      });
      return;
    }

    // if(formData.number!=)
    try {
      console.log("formData:", formData);

      // const info = localStorage.getItem("users");
      // const contactInfo = info ? JSON.parse(info) : [];
      // contactInfo.push(formData);
      // localStorage.setItem("users", JSON.stringify(contactInfo));

      //--------------commenting out to use axios to store to data------------------//

      const response = await axios.post(`${URL}/register`, formData);
      if (response) {
        Swal.fire({
          title: "Succesfully Registered ",
          text: response.data.message,
          icon: "success",
        });
      }

      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: "Warning",
        text: error.message,
        icon: "warning",
      });
    }
  };

  return (
    <>
      <div className="contain_contact">
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
                  name="name"
                  value={formData.name}
                  type="text"
                  onChange={handlechange}
                  className="form-control"
                  required
                  placeholder=" Your Name"
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
                  placeholder=" Your Number"
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
                  placeholder=" Your Email-id"
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
                  placeholder=" New Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="input-group_reg mb-3">
                <input
                  name="confirm_pass"
                  value={formData.confirm_pass}
                  type="password"
                  onChange={handlechange}
                  className="form-control"
                  required
                  placeholder=" Confirm Password"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="vendor_register">
                <a href="/registerVendor" style={{ color: "currentcolor" }}>
                  {" "}
                  Register as Vendor
                </a>
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
    </>
  );
};

export default Register;
