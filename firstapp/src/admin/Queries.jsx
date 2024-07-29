import React, { useEffect, useState } from "react";
import Sidebar_ from "./Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../config";

const Queries = () => {
  const [query, setquery] = useState([]);

  useEffect(() => {
    getquery();
  }, []);

  const getquery = async () => {
    try {
      const response = await axios.get(`${URL}/getcontact`);
      console.log(response.data);
      setquery(response.data.contactGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const response = await axios.delete(
        `${URL}/deleteContactById/${contactId}`
      );
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          title: "Query Deleted Successfully ",
          text: response.data.message,
          icon: "success",
        });
        getquery();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar_ />
      <div className="rightbox">
        <h4 style={{ textAlign: "center" }}>All Queries</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>

              <th scope="col">Email-id</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {query
              ? query.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
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

export default Queries;
