import React, { useState } from "react";
import login from "./images/login.webp";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import URL from "../config";

const Login = ({ setloggeduser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // ... isse vo data overwrite nhi hoga balki add hoga
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("formData:", formData);

      // const info = localStorage.getItem("users");
      // const contactInfo = info ? JSON.parse(info) : [];

      // // Check if the submitted email matches any record
      // const existingContact = contactInfo.find(
      //   (user) => user.email === formData.email
      // );

      // if (!existingContact) {
      //   // If email does not match any record
      //   throw new Error("Email not found. Please register first.");
      // }

      // if (existingContact.password !== formData.password) {
      //   // If email matches but password does not match
      //   throw new Error("Password incorrect. Please try again.");
      // }

      const response = await axios.post(`${URL}/login`, formData);

      if (response) {
        Swal.fire({
          title: "Login Successful ",
          text: response.data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Login Failed ",
          text: response.data.message,
          icon: "warning",
        });
      }

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(response.data.loggedUser)
      );
      setloggeduser(response.data.loggedUser);

      // If email and password match

      navigate("/");
    } catch (error) {
      if (error.response.status) {
        Swal.fire({
          title: "Login Failed ",
          text: error.response.data.message,
          icon: "warning",
        });
      }
    }
  };

  return (
    <div className="contain_contact">
      <div className="contact_body">
        <p className="text-muted text-center">Login</p>
        <h3 className="text-center">
          Welcome Back!<span className="text-primary "> Login</span>
        </h3>
      </div>
      <div className="register_box">
        <div className="m-auto">
          <img className="login" src={login} />
        </div>
        <div className="register_form m-auto">
          <form onSubmit={handlesubmit}>
            <div className="input-group_reg mb-3" style={{ width: "73%" }}>
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handlechange}
                className="form-control"
                required
                placeholder=" Enter Email-id"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div className="input-group_reg mb-3" style={{ width: "73%" }}>
              <input
                name="password"
                value={formData.password}
                type="password"
                onChange={handlechange}
                className="form-control"
                required
                placeholder=" Enter password"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <p>
              <a href="/forgotpassword">Forgot Password?</a>
            </p>
            <div className="vendor_register">
              <a
                href="/loginVendor"
                style={{ color: "currentcolor", textDecoration: "unset" }}
              >
                {" "}
                Login as Vendor
              </a>
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
