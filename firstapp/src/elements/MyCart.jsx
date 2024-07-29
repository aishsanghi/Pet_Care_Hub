import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../config";

const MyCart = ({ loggeduser, setcount }) => {
  const [cart, setcart] = useState([]);
  const [total, settotal] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    altnum: "",
    deliveryAdd: "",
  });

  useEffect(() => {
    summation();
  }, [cart]);

  useEffect(() => {
    getproBycart();
    getuserid();
  }, [loggeduser, URL]);

  const summation = () => {
    if (cart) {
      let newtotal = 0;
      cart.forEach((item) => {
        newtotal += item.quantity * item.price;
      });
      settotal(newtotal);
    }
  };

  const getproBycart = async () => {
    try {
      console.log("cartURL", URL);
      const response = await axios.get(
        `${URL}/getcartByUserId/${loggeduser._id}`
      );
      console.log("Cart", response.data.cart);
      const mainRec = response.data.cart;
      const filteredRec = mainRec.filter((item) => item.status === "pending");
      setcart(filteredRec);
      setcount(filteredRec.length);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleform = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("formdata:", formData);
      const response = await axios.post(`${URL}/addorder`, {
        user: loggeduser._id,
        cartArray: cart.map((item) => item._id),
        total: total,
        altNum: formData.altnum,
        deliveryAdd: formData.deliveryAdd,
      });
      if (response) {
        Swal.fire({
          title: "Order Placed ",
          text: "Order has been placed",
          icon: "success",
        });
        getproBycart();
        setFormData({
          altnum: "",
          deliveryAdd: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handledelete = async (proId) => {
    try {
      const response = await axios.delete(`${URL}/deleteObjectById/${proId}`);
      if (response) {
        Swal.fire({
          title: "Product Remove from Cart ",
          text: "",
          icon: "success",
        });
        getproBycart();
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: "",
          icon: "warning",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getuserid = async () => {
    try {
      const response = await axios.get(`${URL}/getuserbyid/${loggeduser._id}`);
      console.log(response.data.user);
      setFormData(response.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQchange = async (item, newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) {
      console.log("Quantity should be between 1 and available stock.");
      Swal.fire({
        title: "Warning",
        text: "Quantity should be available in stock and not be negative",
        icon: "warning",
      });
      return;
    }

    try {
      const response = await axios.patch(
        `${URL}/updateQuantityById/${item._id}`,
        {
          quantity: newQuantity,
          price: item.product.price,
        }
      );
      if (response.status === 200) {
        const updatedCart = cart.map((cart) =>
          cart._id === item._id ? { ...cart, quantity: newQuantity } : cart
        );
        setcart(updatedCart);
        summation();
      } else {
        console.log(`Failed to update cart: ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="cart_contain">
      <div className="subpart1">
        <h2 className="modal-title" id="exampleModalLabel">
          Your Cart
        </h2>
        <div className="order_detail">
          {cart ? (
            cart.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  borderBottom: "1px solid blue",
                  padding: "13px",
                }}
              >
                <div className="order_pic">
                  <img
                    src={`http://localhost:3001/${item.product.imageUrl}`}
                    style={{ height: "120px", width: "120px" }}
                  />
                </div>
                <div className="order_info" style={{ placeSelf: "center" }}>
                  <h4
                    className="card-title text-dark"
                    style={{ fontWeight: "600" }}
                  >
                    {item.product.title}
                  </h4>
                  <p
                    className="text-dark"
                    style={{
                      fontSize: "small",
                      margin: "auto",
                      fontWeight: "600",
                    }}
                  >
                    ${item.product.price}
                  </p>
                  <p className="text-secondary">{item.product.detail}</p>
                </div>
                <div className="order_quantity" style={{ display: "flex" }}>
                  <button
                    style={{ border: "white" }}
                    onClick={() => handleQchange(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <h5>{item.quantity}</h5>
                  <button
                    style={{ border: "white" }}
                    onClick={() => handleQchange(item, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    style={{ border: "white" }}
                    onClick={() => handledelete(item._id)}
                  >
                    <i class="material-icons">&#xe872;</i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
        <div className="modal1-footer" style={{ width: "98%" }}>
          <a href="/allproducts">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              style={{ width: "92%", backgroundColor: "green", margin: "17px" }}
            >
              Continue Shopping
            </button>
          </a>
        </div>
      </div>
      <div className="subpart2">
        <div className="subpart2_heading" style={{ display: "flex" }}>
          <h2 className="modal-title" id="exampleModalLabel">
            Final Checkout
          </h2>
          <h5 style={{ margin: "auto" }}>Total: ${total}</h5>
        </div>
        <form onSubmit={handlesubmit}>
          <div className="mb-2">
            <label htmlFor="nameInput" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              style={{ padding: "1px 8px" }}
              id="nameInput"
              name="name"
              value={formData.name}
              onChange={handleform}
              readOnly
            />
          </div>

          <div className="mb-2">
            <label htmlFor="numberInput" className="form-label">
              Number
            </label>
            <input
              type="number"
              className="form-control"
              style={{ padding: "1px 8px" }}
              id="numberInput"
              name="number"
              value={formData.number}
              readOnly
            />
          </div>

          <div className="mb-2">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              style={{ padding: "1px 8px" }}
              id="emailInput"
              name="email"
              value={formData.email}
              readOnly
            />
          </div>
          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label">
              Alternative Number
            </label>
            <input
              type="number"
              className="form-control"
              style={{ padding: "1px 8px" }}
              id="passwordInput"
              name="altnum"
              rows="3"
              value={formData.altnum}
              onChange={handleform}
              required
            ></input>
          </div>
          <div className="mb-2">
            <label htmlFor="passwordInput" className="form-label">
              Delivery Address
            </label>
            <input
              className="form-control"
              style={{ padding: "1px 8px" }}
              id="passwordInput"
              name="deliveryAdd"
              rows="3"
              value={formData.deliveryAdd}
              onChange={handleform}
              required
            ></input>
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyCart;
