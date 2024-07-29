import React, { useEffect, useState } from "react";
import Sidebar_ from "./Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../config";

const Users = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    getuserinfo();
  }, []);

  const getuserinfo = async () => {
    try {
      const response = await axios.get(`${URL}/getusers`);
      console.log(response.data);
      setData(response.data.userGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${URL}/deleteUser/${userId}`);
      console.log(response.data);
      getuserinfo();
      if (response.data) {
        Swal.fire({
          title: "User Delete Successfully ",
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
      <div className="rightbox">
        <h4 style={{ textAlign: "center" }}>All Users</h4>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Email-id</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Data
              ? Data.filter((i) => i.role !== "admin").map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.email}</td>
                    <td>
                      {
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      }
                    </td>
                  </tr>
                ))
              : "no records"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
