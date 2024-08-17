import React, { useState } from "react";
import login from "./images/login.webp";
import URL from "../config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ForgotUserPass = () => {
  const [email, setEmail] = useState("");
  // const [e, set] = useState(0);
  const navigate = useNavigate();

  const handlechange = (event) => {
    setEmail(event.target.value);
  };

  // const handleSubmit = async (event) => {
  //   console.log("email", email);
  //   event.preventDefault();

  //   try {
  //     const response = await axios.post(`${URL}/forgotpassword`, { email });

  //     console.log("pass", response.data);
  //     if (response.data) {
  //       Swal.fire({
  //         title: "OTP Sent",
  //         text: "An OTP has been sent to your email.",
  //         icon: "success",
  //       });
  //       navigate("/login");
  //     } else {
  //       Swal.fire({
  //         title: "Login Failed ",
  //         text: response.data.message,
  //         icon: "warning",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${URL}/forgotpassword`,
        { email }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );

      console.log("Response:", response);
      if (response.data) {
        Swal.fire({
          title: "OTP Sent",
          text: "An OTP has been sent to your email.",
          icon: "success",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Login Failed ",
          text: response.data.message,
          icon: "warning",
        });
      }
    } catch (error) {
      console.error("Error response:", error.response);
      Swal.fire({
        title: "Error",
        text: error.response ? error.response.data.message : error.message,
        icon: "error",
      });
    }
  };

  // useEffect(() => {}, [e]);
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
          <form onSubmit={handleSubmit}>
            <label for="contact">Enter your email:</label>
            <input
              type="email"
              id="contact"
              name="contact"
              required
              onChange={handlechange}
            />
            <button type="submit">Send OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotUserPass;
