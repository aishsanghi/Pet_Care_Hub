import React, { useEffect, useState } from "react";
import Sidebar_ from "../Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../../config";

const AdminVendor = () => {
  const [ven, setven] = useState([]);

  useEffect(() => {
    getven();
  }, []);

  const getven = async () => {
    try {
      const response = await axios.get(`${URL}/getvendor`);
      console.log(response.data.vendorGet);
      setven(response.data.vendorGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlestatus = async (id, status) => {
    let loginStatus = "";
    if (status === "inactive") {
      loginStatus = "active";
    } else {
      loginStatus = "inactive";
    }
    try {
      console.log("id", id, "ststus", loginStatus);

      const response = await axios.patch(`${URL}/updateloginstatus/${id}`, {
        loginStatus,
      });
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          title: "Status Updated Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
      getven();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar_ />
      <div className="rightbox">
        <h4
          style={{
            textAlign: "center",
            marginTop: "6px",
            borderBottom: "double",
          }}
        >
          All Vendors
        </h4>
        <a
          href="/addvendor"
          class="btn btn-sm btn-outline-primary ms-2 "
          role="button"
          aria-pressed="true"
          style={{ marginBottom: "10px" }}
        >
          Add New Vendor
        </a>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Name</th>
              <th scope="col">Business Name</th>
              <th scope="col">Number</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">loginStatus</th>
            </tr>
          </thead>
          <tbody>
            {ven
              ? ven.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.businessName}</td>
                    <td>{item.number}</td>
                    <td>{item.email}</td>
                    <td>{item.address}</td>

                    <td>
                      {item.loginStatus === "active" ? (
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          onClick={() =>
                            handlestatus(item._id, item.loginStatus)
                          }
                        >
                          Inactive
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-outline-primary"
                          onClick={() =>
                            handlestatus(item._id, item.loginStatus)
                          }
                        >
                          Active
                        </button>
                      )}
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

export default AdminVendor;
