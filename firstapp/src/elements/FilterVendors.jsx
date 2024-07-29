import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import URL from "../config";

const FilterVendors = ({ loggeduser }) => {
  const [ven, setven] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [allven, setallven] = useState([]);
  const { venId } = useParams();

  useEffect(() => {
    getproByVendorId();
  }, []);

  useEffect(() => {
    filtervendor();
  }, [searchTerm]);

  const handlechange = (event) => {
    setsearchTerm(event.target.value);
  };

  const filtervendor = () => {
    let filterpro = allven;

    if (searchTerm) {
      filterpro = filterpro.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setven(filterpro);
  };

  const getproByVendorId = async () => {
    try {
      const response = await axios.get(`${URL}/getproByVendorId/${venId}`);
      console.log("VendorPro", response.data.product);
      setven(response.data.product);
      setallven(response.data.product);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleadd = async (item) => {
    if (!loggeduser) {
      Swal.fire({
        title: "Please login to add products to your cart",
        icon: "warning",
      });
      return;
    }

    const user = loggeduser._id;

    try {
      // Check if the item is already in the cart
      const isInCart = ven.some((cartItem) => cartItem.product === item._id);

      if (isInCart) {
        Swal.fire({
          title: "Product has already been added to Cart",
          icon: "warning",
        });
      } else {
        const response = await axios.post(`${URL}/addtocart`, {
          product: item._id,
          user: user,
          price: item.price,
          quantity: 1,
          subtotal: item.price,
          vendorId: item.vendorId,
        });
        console.log(response.data);

        if (response.data) {
          Swal.fire({
            title: "Product Added to Cart",
            text: response.data.message,
            icon: "success",
          });

          // getcart();
          // getproBycart();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="expertbox">
      <div className="headingbox">
        <h2>All Products in the Company</h2>
      </div>
      <div className="searchbar">
        <div className="mb-2">
          <input
            style={{ padding: "4px", width: "96%" }}
            type="text"
            id="disabledTextInput"
            className="form-control"
            placeholder="Search Product"
            onChange={handlechange}
          />
        </div>
      </div>
      <div className="expertcard">
        <div className="card-deck py-5">
          {ven ? (
            ven.map((item) => (
              <div
                className="card m-auto"
                key={item._id}
                style={{ height: "344px" }}
              >
                {/* <img src={dummy} className="card-img-top" alt="..." /> */}
                <img src={`http://localhost:3001/${item.imageUrl}`} />
                <h5 className="card-title text-primary">{item.title}</h5>
                <h6
                  style={{ textAlign: "-webkit-center" }}
                  className="card-text text-dark"
                >
                  ${item.price}
                </h6>
                <h6
                  style={{ textAlign: "-webkit-center" }}
                  className="card-text text-dark"
                >
                  {item.category.title}
                </h6>
                <p className="card-text text-dark">{item.detail}</p>
                {loggeduser?.role !== "admin" &&
                  loggeduser?.role !== "vendor" && (
                    <button
                      type="button"
                      className="btn3 btn-outline-primary"
                      onClick={() => handleadd(item)}
                    >
                      Add to Cart
                    </button>
                  )}
              </div>
            ))
          ) : (
            <p>No records</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterVendors;
