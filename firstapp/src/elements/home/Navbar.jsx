import React from "react";
import mainlogo from "../images/petcareemoji.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import adminpic from "../images/ad3.jpeg";

const Navbar = ({ loggeduser, setloggeduser, count }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    Swal.fire({
      title: "Logged Out",
      text: "Successfully",
      icon: "success",
    }).then(() => {
      setloggeduser(null);
      navigate("/");
    });
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand col-md-1" href="petcareemoji.png">
            <img src={mainlogo} alt="dog" height="80px" width="80px" />
          </a>
          <h1 className="text-primary col-md-3">
            Pet<span className="text-white">Care</span>Hub
          </h1>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul
              className="navbar-nav col-md-7 "
              style={{ alignItems: "center" }}
            >
              <li className="nav-item">
                <a className="linka nav-link" href="/">
                  Home
                </a>
              </li>

              {loggeduser === null ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/about">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/contactus">
                      Contact
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Login
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/allproducts">
                      Products
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/allvendors">
                      Vendors
                    </a>
                  </li>
                  <li className="nav-item">
                    {loggeduser.role === "user" ? (
                      <a className="nav-link" href="/profile">
                        Profile
                      </a>
                    ) : (
                      <a className="nav-link" href="/vendorprofile">
                        Profile
                      </a>
                    )}
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>

                  {loggeduser.role === "admin" && (
                    <div
                      className="admin"
                      // style={{ display: "flex", marginLeft: "100px" }}
                    >
                      <a href="/admin">
                        <img
                          src={adminpic}
                          alt="..."
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "25px",
                          }}
                        />
                      </a>
                      <h5
                        style={{
                          color: "white",
                          alignContent: "center",
                          marginLeft: "9px",
                        }}
                      >
                        Administrator
                      </h5>
                    </div>
                  )}

                  {loggeduser.role === "vendor" && (
                    <div
                      className="vendor"
                      // style={{ display: "flex", marginLeft: "100px" }}
                    >
                      <a href="/vendor">
                        <img
                          src={adminpic}
                          alt="..."
                          style={{
                            height: "50px",
                            width: "50px",
                            borderRadius: "25px",
                          }}
                        />
                      </a>
                      <h5
                        style={{
                          color: "white",
                          alignContent: "center",
                          marginLeft: "9px",
                        }}
                      >
                        {loggeduser.name}
                      </h5>
                    </div>
                  )}

                  {loggeduser.role !== "admin" &&
                    loggeduser.role !== "vendor" && (
                      <div className="icon">
                        <p>{count}</p>
                        <a href="/mycart">
                          <i
                            class="fa fa-shopping-cart"
                            style={{ fontSize: "32px", color: "white" }}
                          ></i>
                        </a>
                        {/* </div> */}

                        <div
                          className="admin"
                          style={{ display: "flex", marginLeft: "100px" }}
                        >
                          <a href="/myorders">
                            <img
                              src={adminpic}
                              alt="..."
                              style={{
                                height: "50px",
                                width: "50px",
                                borderRadius: "25px",
                              }}
                            />
                          </a>
                          <h5
                            style={{
                              color: "white",
                              alignContent: "center",
                              marginLeft: "9px",
                            }}
                          >
                            {loggeduser.name}
                          </h5>
                        </div>
                      </div>
                    )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
