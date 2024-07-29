import React, { useEffect, useState } from "react";
import VendorSidebar from "../VendorSidebar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import URL from "../../config";

const VendorUpdatePro = () => {
  const { proId } = useParams();
  console.log("ID", proId);

  const [cat, setcat] = useState([]);
  const [file, setfile] = useState(null);
  const [formData, setformData] = useState({
    category: "",
    title: "",
    detail: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    getCats();
    getproById();
  }, [proId]);

  const getCats = async () => {
    try {
      const response = await axios.get(`${URL}/getCategory`);
      setcat(response.data.categoryGet);
      console.log("Category", response.data.categoryGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getproById = async () => {
    try {
      const response = await axios.get(`${URL}/getproductById/${proId}`);
      console.log("Product", response.data.product);
      setformData(response.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handlefile = (event) => {
    setfile(event.target.files[0]);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    const formDataNew = new FormData();

    formDataNew.append("proImage", file);
    formDataNew.append("category", formData.category);
    formDataNew.append("title", formData.title);
    formDataNew.append("detail", formData.detail);
    formDataNew.append("price", formData.price);
    formDataNew.append("stock", formData.stock);
    try {
      const response = await axios.put(
        `/updateproductById/${proId}`,
        formDataNew
      );
      console.log(response.data);
      if (response.data) {
        Swal.fire({
          title: "Product Updated Successfully ",
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
      <VendorSidebar />
      <div
        className="rightbox"
        style={{
          alignContent: "center",
          padding: "19px",
        }}
      >
        <div className="heading" style={{ display: "flex" }}>
          <h4>Update Products</h4>
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
            <div className="mb-1">
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handlechange}
              >
                <option value="choose a category">choose a category</option>
                {cat &&
                  cat.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              {/* <label for="exampleInputEmail1" className="form-label">
              Choose File
            </label> */}
              <input
                style={{ height: "38px" }}
                type="file"
                accept="image/*"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                onChange={handlefile}
              />
            </div>
            <div>
              <label for="exampleInputEmail1" className="form-label">
                Enter Product Title
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                value={formData.title}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" className="form-label">
                Enter Product Detail
              </label>
              <input
                style={{ height: "30px" }}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                name="detail"
                value={formData.detail}
                onChange={handlechange}
              />
            </div>
            <div>
              <label for="exampleInputPassword1" className="form-label">
                Enter Product Price
              </label>
              <input
                style={{ height: "30px" }}
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                name="price"
                value={formData.price}
                onChange={handlechange}
              />
            </div>
            <div className="mb-2">
              <label for="exampleInputPassword1" className="form-label">
                Enter Product Stock
              </label>
              <input
                style={{ height: "30px" }}
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                name="stock"
                value={formData.stock}
                onChange={handlechange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorUpdatePro;
