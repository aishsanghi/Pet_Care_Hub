import React, { useEffect, useState } from "react";
import Sidebar_ from "../Sidebar_";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../../config";

const Updateexpert = () => {
  const { expId } = useParams();
  const [formData, setformData] = useState({
    name: "",
    speciality: "",
    number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    getexpertbyid();
  }, [expId]);

  const getexpertbyid = async () => {
    try {
      const response = await axios.get(`${URL}/getexpertById/${expId}`);
      console.log(response.data.expertId);
      setformData(response.data.expertId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.put(`${URL}/updatebyid/${expId}`, formData);
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          title: "Expert Updated Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
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
          <h4>Add New Experts</h4>
          <a
            href="/experts"
            class="btn btn-sm btn-outline-primary ms-2 "
            role="button"
            aria-pressed="true"
            style={{ marginBottom: "10px" }}
          >
            View Experts
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
                Enter Speciality
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                id="examplespeciality"
                name="speciality"
                value={formData.speciality}
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
            <button type="submit" class="btn btn-outline-primary">
              Update Expert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Updateexpert;
