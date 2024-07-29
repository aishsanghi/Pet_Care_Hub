import React, { useState } from "react";
import login from "./images/vendorloginbg.jpg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import URL from "../config";

const LoginVendor = ({ setloggeduser }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registrationNum: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("formData:", formData);
      const response = await axios.post(`${URL}/loginvendor`, formData);

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
    <div className="contain_login">
      <div className="contact_body">
        <p className="text-muted text-center">Login</p>
        <h3 className="text-center">
          Welcome Back!<span className="text-primary "> Login</span>
        </h3>
      </div>
      <div className="register_box">
        <div className="m-auto">
          <img className="login" src={login} style={{ height: "327px" }} />
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
            <div className="col-5">
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

export default LoginVendor;
