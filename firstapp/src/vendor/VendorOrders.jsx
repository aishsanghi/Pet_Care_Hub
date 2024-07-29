import React, { useEffect, useState } from "react";
import VendorSidebar from "./VendorSidebar";
import axios from "axios";
import Swal from "sweetalert2";
import URL from "../config";

const VendorOrders = ({ loggeduser }) => {
  const [order, setOrder] = useState([]);
  const [selectedCartArray, setSelectedCartArray] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [selectedNumber, setselectedNumber] = useState(null);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [selectStatus, setselectStatus] = useState(null);
  const [selectOrder, setselectOrder] = useState(null);
  const [selectItemStatus, setselectItemStatus] = useState(null);

  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await axios.get(`${URL}/getOrder`);
      console.log(response.data.orderGet);
      setOrder(response.data.orderGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleproClick = (selectedArray) => {
    setSelectedCartArray(selectedArray);
    console.log("selectedArray", selectedArray);
  };

  const handlecustClick = (selectedUser, Number, Address) => {
    setselectedUser(selectedUser);
    setselectedNumber(Number);
    setselectedAddress(Address);
  };

  const handleorder = (event) => {
    setselectOrder(event.target.value);
    console.log("OrderId", event.target.value);
  };

  const handlestatus = (event) => {
    setselectStatus(event.target.value);
    console.log("Status", event.target.value);
  };

  const handleItemstatus = (event) => {
    setselectItemStatus(event.target.value);
    console.log("ItemStatus", event.target.value);
  };

  const handleupdate = async (selectOrder, selectStatus) => {
    if (!selectOrder && !selectStatus) {
      Swal.fire({
        title: "Warning ",
        text: "Please select an order and status id",
        icon: "warning",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `${URL}/updateStatusById/${selectOrder}`,
        {
          status: selectStatus,
        }
      );
      if (response) {
        Swal.fire({
          title: "Status Updated Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
      getOrder();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleItemupdate = async (cartItemId, selectItemStatus) => {
    console.log(cartItemId, selectItemStatus);

    if (!cartItemId && !selectItemStatus) {
      Swal.fire({
        title: "Warning ",
        text: "Please select a product and status",
        icon: "warning",
      });
      return;
    }
    try {
      const response = await axios.patch(
        `${URL}/updateStatusById/${cartItemId}`,
        {
          itemStatus: selectItemStatus,
        }
      );
      if (response) {
        Swal.fire({
          title: "Status Updated Successfully ",
          text: response.data.message,
          icon: "success",
        });
      }
      getOrder();
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
          All Orders
        </h4>

        <div className="ordertable">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No.</th>
                <th scope="col">Order ID</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Payment Mode</th>
                <th scope="col">TimeStamp</th>
                {/* <th scope="col">Status</th> */}
                <th scope="col">Customer</th>
                <th scope="col">Product</th>
              </tr>
            </thead>
            <tbody>
              {order.length ? (
                order
                  .filter((orderItem) =>
                    orderItem.cartArray.some(
                      (cartItem) => cartItem.vendorId === loggeduser._id
                    )
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>ORDER-{item._id}</td>
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
                      {/* <td>{item.status}</td> */}
                      <td>
                        <button
                          type="button"
                          className="ms-5 btn  btn-outline-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#customerModal"
                          onClick={() =>
                            handlecustClick(
                              item.user,
                              item.altNum,
                              item.deliveryAdd
                            )
                          }
                        >
                          View
                        </button>
                        <div
                          className="modal fade"
                          id="customerModal"
                          tabIndex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div
                              className="modal-content"
                              style={{ width: "80%" }}
                            >
                              <form id="exampleForm">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    User Details
                                  </h5>
                                </div>
                              </form>
                              {selectedUser ? (
                                <div className="customer">
                                  <p
                                    class="text-secondary"
                                    style={{ display: "flex", height: "4px" }}
                                  >
                                    Customer Name:{" "}
                                    <p class="text-dark">{selectedUser.name}</p>
                                  </p>
                                  <p
                                    class="text-secondary"
                                    style={{ display: "flex", height: "4px" }}
                                  >
                                    Customer Email:{" "}
                                    <p class="text-dark">
                                      {selectedUser.email}
                                    </p>
                                  </p>
                                  <p
                                    class="text-secondary"
                                    style={{ display: "flex", height: "4px" }}
                                  >
                                    Primary Number:{" "}
                                    <p class="text-dark">
                                      {selectedUser.number}
                                    </p>
                                  </p>
                                  <p
                                    class="text-secondary"
                                    style={{ display: "flex", height: "4px" }}
                                  >
                                    Alternate Number:{" "}
                                    <p class="text-dark">{selectedNumber}</p>
                                  </p>
                                  <p
                                    class="text-secondary"
                                    style={{ display: "flex", height: "4px" }}
                                  >
                                    Delivery Address:{" "}
                                    <p class="text-dark">{selectedAddress}</p>
                                  </p>
                                </div>
                              ) : (
                                "No user details available"
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="product_view">
                          <button
                            type="button"
                            className="ms-5 btn  btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#productModal"
                            onClick={() => handleproClick(item.cartArray)}
                          >
                            View
                          </button>
                          <div
                            className="modal fade"
                            id="productModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div
                                className="modal-content"
                                style={{ width: "130%", height: "340px" }}
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
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No.</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Detail</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Select status</th>
                                        <th scope="col">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedCartArray ? (
                                        selectedCartArray
                                          .filter(
                                            (item) =>
                                              item.vendorId === loggeduser._id
                                          )
                                          .map((cartItem, index) => (
                                            <tr key={cartItem._id}>
                                              <th scope="row">{index + 1}</th>
                                              <td>
                                                <img
                                                  src={`http://localhost:3001/${cartItem.product.imageUrl}`}
                                                  style={{
                                                    height: 50,
                                                    width: 50,
                                                  }}
                                                  alt="Product"
                                                />
                                              </td>
                                              <td>{cartItem.product.title}</td>
                                              <td>${cartItem.product.price}</td>
                                              <td>{cartItem.quantity}</td>
                                              <td>{cartItem.product.detail}</td>
                                              <td>{cartItem.itemStatus}</td>
                                              <td>
                                                <select
                                                  className="selectpro"
                                                  name="status"
                                                  id="status"
                                                  onChange={handleItemstatus}
                                                  style={{
                                                    width: " 101px",
                                                    marginTop: "6px",
                                                  }}
                                                >
                                                  <option value="">
                                                    Select an Order's Status to
                                                    Update
                                                  </option>
                                                  <option value="Approved">
                                                    Approved
                                                  </option>
                                                  <option value="Pick-Up">
                                                    Pick-Up
                                                  </option>
                                                </select>
                                              </td>
                                              <td>
                                                {
                                                  <button
                                                    type="button"
                                                    class="btn btn-outline-primary"
                                                    onClick={() =>
                                                      handleItemupdate(
                                                        cartItem._id,
                                                        selectItemStatus
                                                      )
                                                    }
                                                  >
                                                    Action
                                                  </button>
                                                }
                                              </td>
                                            </tr>
                                          ))
                                      ) : (
                                        <tr>
                                          <td colSpan="6">No items found</td>
                                        </tr>
                                      )}
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
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="8">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorOrders;
