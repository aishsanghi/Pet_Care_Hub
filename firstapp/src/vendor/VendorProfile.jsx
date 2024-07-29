import React, { useEffect, useState } from "react";
import profile_img from "../elements/images/profile_photo.webp";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../config";

const VendorProfile = ({ loggeduser, setloggeduser }) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getvendorByid();
  }, [loggeduser]);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${URL}/updatebyid/${loggeduser._id}`,
        formData
      );

      if (response.data) {
        Swal.fire({
          title: "Updated Successfully ",
          text: response.data.message,
          icon: "success",
        });

        console.log(response.data.updatevendor);
        setFormData(response.data.updatevendor);

        setloggeduser(response.data.updatevendor);

        localStorage.setItem(
          "loggedUser",
          JSON.stringify(response.data.updatevendor)
        );
        getvendorByid();
      } else {
        Swal.fire({
          title: "Update Failed ",
          text: response.data.message,
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getvendorByid = async () => {
    try {
      const response = await axios.get(
        `${URL}/getvendorById/${loggeduser._id}`
      );
      console.log(response.data.vendorId);
      setFormData(response.data.vendorId);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="profile_box">
      <div className="left"></div>
      <div className="right">
        <div className="headline">
          <h3>My Profile</h3>

          {/* <!-- Button trigger modal --> */}

          <button
            className="ms-5 btn  fw-bold"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i class="fa fa-pencil"></i> Update
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form id="exampleForm" onSubmit={handlesubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="nameInput" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        name="name"
                        value={formData.name}
                        onChange={handlechange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nameInput" className="form-label">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handlechange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="numberInput" className="form-label">
                        Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="numberInput"
                        name="number"
                        value={formData.number}
                        onChange={handlechange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="emailInput" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        name="email"
                        value={formData.email}
                        onChange={handlechange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="passwordInput" className="form-label">
                        Password
                      </label>
                      <input
                        className="form-control"
                        id="passwordInput"
                        name="password"
                        rows="3"
                        value={formData.password}
                        onChange={handlechange}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="profile_content">
          <div className="content_heading">
            <img src={profile_img} alt="profile_pic" height={120} width={120} />
            <h3 className="welcome">
              <span className="text-danger">Welcome</span>,
              {loggeduser && loggeduser.name}
            </h3>
          </div>
          <div className="user_details">
            <div className="profile_col-md-1">
              <p>
                <span style={{ fontWeight: "bold" }}>Number: </span>
                {loggeduser && loggeduser.number}
              </p>

              <p>
                <span style={{ fontWeight: "bold" }}>Business Name: </span>
                {loggeduser && loggeduser.businessName}
              </p>

              <p>
                <span style={{ fontWeight: "bold" }}>Email-Id: </span>
                {loggeduser && loggeduser.email}
              </p>

              <p>
                <span style={{ fontWeight: "bold" }}>Password: </span>
                {loggeduser && loggeduser.password}
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
