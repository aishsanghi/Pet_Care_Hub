import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import URL from "../config";

const AllProducts = ({ loggeduser, getproBycart }) => {
  const [pro, setpro] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [allpro, setallpro] = useState([]);
  const [price, setprice] = useState([0, Infinity]);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    getpro();
    if (loggeduser) {
      getcart();
    }
  }, []);

  useEffect(() => {
    filterproducts();
  }, [searchTerm, price]);

  const handleprice = (range) => {
    setprice(range);
  };

  const handlechange = (event) => {
    setsearchTerm(event.target.value);
  };

  const getcart = async () => {
    try {
      const response = await axios.get(
        `${URL}/getcartByUserId/${loggeduser._id}`
      );
      console.log("Cart", response.data.cart);
      setcart(response.data.cart);
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
      console.log("item", item);
      // Check if the item is already in the cart
      const isInCart = cart.some((cartItem) => {
        console.log(
          "cartItem.product._id",
          cartItem.product._id,
          "item._id",
          item._id
        );
        return cartItem.product._id.toString() === item._id.toString();
      });

      if (isInCart) {
        Swal.fire({
          title: "Product has already been added to Cart",
          icon: "warning",
        });
        return;
      }
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

        getcart();
        getproBycart();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getpro = async () => {
    try {
      const response = await axios.get(`${URL}/getproduct`);
      console.log(response.data.productGet);
      setpro(response.data.productGet);
      setallpro(response.data.productGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterproducts = () => {
    let filterpro = allpro;

    if (searchTerm) {
      filterpro = filterpro.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    const [min, max] = price;

    filterpro = filterpro.filter(
      (product) => product.price >= min && product.price <= max
    );

    setpro(filterpro);
  };

  return (
    <div className="expertbox">
      <div className="headingbox">
        <h2>All Products</h2>
      </div>
      <div className="searchbar">
        <div className="mb-2">
          <input
            style={{ padding: "4px", width: "96%" }}
            type="text"
            id="disabledTextInput"
            className="form-control"
            placeholder="Search Products"
            onChange={handlechange}
          />
        </div>
        <div className="pricing" style={{ display: "flex" }}>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([0, Infinity])}
          >
            Reset
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([10, 99])}
          >
            $10-$99
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([100, 499])}
          >
            $100-$499
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([500, 999])}
          >
            $500-$999
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([1000, 1499])}
          >
            $1000-$1499
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={() => handleprice([1500, 1999])}
          >
            $1500-$1999
          </button>
        </div>
      </div>

      <div className="expertcard">
        <div className="card-deck py-5">
          {pro ? (
            pro.map((item) => (
              <div
                className="card m-auto"
                key={item._id}
                style={{ height: "385px" }}
              >
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
                {item.stock == 0 ? (
                  <p style={{ color: "red" }}>Item Out Of Stock!!</p>
                ) : (
                  <div className="nonstock">
                    <p
                      className="card-text text-dark"
                      style={{ textAlign: "-webkit-center" }}
                    >
                      Stock:{item.stock}
                    </p>
                    <button
                      type="button"
                      class="btn3 btn-outline-primary"
                      onClick={() => handleadd(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
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

export default AllProducts;
