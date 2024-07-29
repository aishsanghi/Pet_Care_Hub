import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VendorSidebar from "../VendorSidebar";

const VendorAddPro = ({ loggeduser }) => {
  const [cat, setcat] = useState([]);
  const [file, setfile] = useState(null);
  const [formData, setformData] = useState({
    category: "",
    title: "",
    detail: "",
    price: "",
    stock: "",
  });

  const handlefile = (event) => {
    setfile(event.target.files[0]);
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      Swal.fire({
        title: "Please select a file",
        text: file.message,
        icon: "warning",
      });
      return;
    }
    const formDataNew = new FormData();

    formDataNew.append("proImage", file);
    formDataNew.append("category", formData.category);
    formDataNew.append("title", formData.title);
    formDataNew.append("detail", formData.detail);
    formDataNew.append("price", formData.price);
    formDataNew.append("stock", formData.stock);
    formDataNew.append("vendorId", loggeduser._id);
    try {
      const response = await axios.post(`${URL}/addproduct`, formDataNew);
      if (response.data) {
        Swal.fire({
          title: "Product Added Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
      setformData({
        category: "",
        title: "",
        detail: "",
        price: "",
        stock: "",
      });
      // setfile(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCats();
  }, []);

  const getCats = async () => {
    try {
      const response = await axios.get(`${URL}/getCategory`);
      setcat(response.data.categoryGet);
      console.log(response.data.categoryGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="dashboard">
      <VendorSidebar />
      <div
        className="rightbox"
        style={{
          alignContent: "center",
          padding: "19px",
        }}
      >
        <div className="heading" style={{ display: "flex" }}>
          <h4>Add New Products</h4>
          <a
            href="/vendorproduct"
            class="btn btn-sm btn-outline-primary ms-2 "
            role="button"
            aria-pressed="true"
            style={{ marginBottom: "10px" }}
          >
            View Products
          </a>
        </div>

        <div className="addsubsection">
          <form onSubmit={handlesubmit}>
            <div class="mb-1">
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handlechange}
              >
                <option value="choose a category">choose a category</option>
                {cat &&
                  cat.map((item) => (
                    <option value={item._id}>{item.title}</option>
                  ))}
              </select>
            </div>
            <div>
              {/* <label for="exampleInputEmail1" class="form-label">
              Choose File
            </label> */}
              <input
                style={{ height: "38px" }}
                type="file"
                accept="image/*"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handlefile}
              />
            </div>
            <div>
              <label for="exampleInputEmail1" class="form-label">
                Enter Product Title
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                value={formData.title}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" class="form-label">
                Enter Product Detail
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="detail"
                value={formData.detail}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" class="form-label">
                Enter Product Price
              </label>
              <input
                style={{ height: "30px" }}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                name="price"
                value={formData.price}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" class="form-label">
                Enter Product Stock
              </label>
              <input
                style={{ height: "30px" }}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
                name="stock"
                value={formData.stock}
                onChange={handlechange}
              />
            </div>
            <button type="submit" class="btn btn-outline-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorAddPro;
