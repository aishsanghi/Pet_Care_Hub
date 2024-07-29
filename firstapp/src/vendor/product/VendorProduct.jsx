import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import VendorSidebar from "../VendorSidebar";
import URL from "../../config";

const VendorProduct = ({ loggeduser }) => {
  const [pro, setpro] = useState([]);

  useEffect(() => {
    getproductById();
  }, [loggeduser]);

  const getproductById = async () => {
    try {
      const response = await axios.get(
        `${URL}/getproByVendorId/${loggeduser._id}`
      );
      setpro(response.data.product);
      console.log("PRODS", response.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (proId) => {
    try {
      const response = await axios.delete(`${URL}/deleteProductById/${proId}`);
      console.log(response.data);
      getproductById();
      if (response.data) {
        Swal.fire({
          title: "Product Deleted Successfully ",
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
      <div className="rightbox">
        <h4
          style={{
            textAlign: "center",
            marginTop: "6px",
            borderBottom: "double",
          }}
        >
          All Products
        </h4>

        <a
          href="/VendorAddPro"
          class="btn btn-sm btn-outline-primary ms-2 "
          role="button"
          aria-pressed="true"
          style={{ marginBottom: "10px" }}
        >
          Add New Product
        </a>
        <div className="tableContent ">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Image</th>
                <th scope="col">Category</th>
                <th scope="col">Title</th>
                <th scope="col">Detail</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Update Product</th>
                <th scope="col">Delete Product</th>
              </tr>
            </thead>
            <tbody>
              {pro
                ? pro.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={`http://localhost:3001/${item.imageUrl}`}
                          style={{ height: 50, width: 50 }}
                        />
                      </td>
                      <td>{item.category && item.category.title}</td>
                      <td>{item.title}</td>
                      <td>{item.detail}</td>
                      <td>${item.price}</td>
                      <td>${item.stock}</td>
                      <td>
                        {
                          <a
                            href={`/vendorupdateproduct/${item._id}`}
                            class="btn btn-outline-primary"
                            role="button"
                            aria-pressed="true"
                            style={{ marginBottom: "10px" }}
                          >
                            Update
                          </a>

                          // {/* </button> */}
                        }
                      </td>
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

export default VendorProduct;
