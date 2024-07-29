import React, { useState } from "react";
import Sidebar_ from "../Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../../config";

const Addcategory = ({ loggeduser }) => {
  const [file, setfile] = useState(null);
  const [title, settitle] = useState("");
  const [detail, setdetail] = useState("");
  // const [vendorId, setvendorId] = useState("");

  const handlefile = (event) => {
    setfile(event.target.files[0]);
  };

  const handletitle = (event) => {
    settitle(event.target.value);
  };

  const handledetail = (event) => {
    setdetail(event.target.value);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      Swal.fire({
        title: "Please select a file",
        text: file.message,
        icon: "warning",
      });
    }
    const formData = new FormData();
    formData.append("catImage", file);
    formData.append("title", title);
    formData.append("detail", detail);
    formData.append("vendorId", loggeduser._id);
    try {
      const response = await axios.post(`${URL}/addcategory`, formData);
      if (response.data) {
        Swal.fire({
          title: "Category Added Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar_ />

      <div
        className="rightbox"
        style={{
          alignContent: "center",
          padding: "19px",
        }}
      >
        <div className="heading" style={{ display: "flex" }}>
          <h4>Add New Categories</h4>
          <a
            href="/category"
            class="btn btn-sm btn-outline-primary ms-2 "
            role="button"
            aria-pressed="true"
            style={{ marginBottom: "10px" }}
          >
            View Categories
          </a>
        </div>
        <div className="addsubsection">
          <form onSubmit={handlesubmit}>
            <div class="mb-3">
              {/* <label for="exampleInputEmail1" class="form-label">
              Choose File
            </label> */}
              <input
                type="file"
                accept="image/*"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handlefile}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Enter Category Title
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handletitle}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Enter Category Detail
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                onChange={handledetail}
              />
            </div>
            <button type="submit" class="btn btn-outline-primary">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcategory;
