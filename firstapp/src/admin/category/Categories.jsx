import React, { useEffect, useState } from "react";
import Sidebar_ from "../Sidebar_";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../../config";

const Categories = () => {
  const [cat, setcat] = useState([]);

  useEffect(() => {
    getcat();
  }, []);

  const getcat = async () => {
    try {
      const response = await axios.get(`${URL}/getCategory`);
      console.log(response.data);
      setcat(response.data.categoryGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (catId) => {
    try {
      const response = await axios.delete(`${URL}/deleteCategoryById/${catId}`);
      console.log(response.data);
      getcat();
      if (response.data) {
        Swal.fire({
          title: "Category Deleted Successfully ",
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
        <h4
          style={{
            textAlign: "center",
            marginTop: "6px",
            borderBottom: "double",
          }}
        >
          All Categories
        </h4>

        <a
          href="/addcategory"
          class="btn btn-sm btn-outline-primary ms-2 "
          role="button"
          aria-pressed="true"
          style={{ marginBottom: "10px" }}
        >
          Add New Category
        </a>
        <div className="tableContent ">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Vendors Name</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cat
                ? cat.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.vendorId ? item.vendorId.name : "admin"}</td>
                      <td>
                        <img
                          src={`http://localhost:3001/${item.imageUrl}`}
                          style={{ height: 50, width: 50 }}
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.detail}</td>
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
    </div>
  );
};

export default Categories;
