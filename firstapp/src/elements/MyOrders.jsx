import axios from "axios";
import React, { useEffect, useState } from "react";

const MyOrders = ({ loggeduser }) => {
  const [order, setorder] = useState([]);
  const [selectedCartArray, setSelectedCartArray] = useState([]);

  useEffect(() => {
    getOrderById();
  }, [loggeduser]);

  const getOrderById = async () => {
    try {
      const response = await axios.get(
        `${URL}/getOrderByUserId/${loggeduser._id}`
      );
      console.log("OrderData", response.data.order);
      setorder(response.data.order);
    } catch (error) {
      console.log("ERROR", error.message);
    }
  };

  const handleViewClick = (selectedArray) => {
    setSelectedCartArray(selectedArray);
  };

  return (
    <div className="orderbox">
      <h4
        style={{
          textAlign: "center",
          marginTop: "6px",
          borderBottom: "double",
        }}
      >
        My Orders
      </h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.No.</th>
            <th scope="col">Order ID</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Payment Mode</th>
            <th scope="col">TimeStamp</th>
            <th scope="col">Status</th>
            <th scope="col">Product</th>
          </tr>
        </thead>
        <tbody>
          {order
            ? order.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>ORDER:{item._id}</td>
                  <td>${item.total}</td>
                  <td>{item.paymentMode}</td>
                  <td>
                    {new Date(item.orderDate).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>

                  <td>{item.status}</td>
                  <td>
                    {
                      <div className="view">
                        <button
                          type="button"
                          className="ms-5 btn  fw-bold btn btn-outline-info"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          class="btn btn-outline-info"
                          onClick={() => handleViewClick(item.cartArray)}
                        >
                          View
                        </button>
                        <div
                          className="modal fade"
                          id="exampleModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div
                              className="modal-content"
                              style={{ width: "130%", height: "fitcontent" }}
                            >
                              <form id="exampleForm">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Item Lists
                                  </h5>
                                </div>
                                <table class="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">S.No.</th>
                                      <th scope="col"> Image</th>
                                      <th scope="col"> Name</th>
                                      <th scope="col"> Price</th>
                                      <th scope="col">Quantity</th>
                                      <th scope="col">Detail</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedCartArray
                                      ? selectedCartArray.map(
                                          (cartitem, index) => (
                                            <tr key={cartitem._id}>
                                              <th scope="row">{index + 1}</th>
                                              <td>
                                                <img
                                                  src={`http://localhost:3001/${cartitem.product.imageUrl}`}
                                                  style={{
                                                    height: 50,
                                                    width: 50,
                                                  }}
                                                />
                                              </td>
                                              <td>{cartitem.product.title}</td>
                                              <td>${cartitem.product.price}</td>
                                              <td>{cartitem.quantity}</td>
                                              <td>{cartitem.product.detail}</td>
                                            </tr>
                                          )
                                        )
                                      : "no"}
                                  </tbody>
                                </table>

                                <div
                                  className="modal-footer"
                                  style={{ placeContent: "center" }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </td>
                </tr>
              ))
            : "no records"}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
