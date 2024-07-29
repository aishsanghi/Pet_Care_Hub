import axios from "axios";
import React, { useEffect, useState } from "react";
import petshop from "./images/shop2.jpg";
import URL from "../config";

const AllVendors = () => {
  const [ven, setven] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [allven, setallven] = useState([]);

  useEffect(() => {
    getven();
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
        item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setven(filterpro);
  };

  const getven = async () => {
    try {
      const response = await axios.get(`${URL}/getvendor`);
      console.log(response.data.vendorGet);
      setven(response.data.vendorGet);
      setallven(response.data.vendorGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="expertbox">
      <div className="headingbox">
        <h2>All Vendors</h2>
      </div>
      <div className="searchbar">
        <div className="mb-2">
          <input
            style={{ padding: "4px", width: "96%" }}
            type="text"
            id="disabledTextInput"
            className="form-control"
            placeholder="Search Company"
            onChange={handlechange}
          />
        </div>
      </div>
      <div className="subbox">
        <div className="shop">
          {ven
            ? ven.map((item) => (
                <div className="shop_item" key={item.id}>
                  <div className="shop1_img">
                    <img src={petshop} />
                  </div>
                  <div className="shopscontent">
                    <div
                      className="shopName"
                      style={{ alignContent: "center" }}
                    >
                      <h5>{item.businessName}</h5>

                      <h6>Owner Name: {item.name}</h6>
                      <a
                        href={`/filtervendors/${item._id}`}
                        class="btn btn-outline-primary"
                        role="button"
                        aria-pressed="true"
                        style={{ height: "28px", padding: "0px 3px" }}
                      >
                        View More
                      </a>
                    </div>
                    <div
                      className="shopDetails"
                      style={{
                        width: "71%",
                        alignContent: "center",
                        height: "151px",
                      }}
                    >
                      <div className="add">
                        <i class="fa fa-phone"></i>
                        <p> {item.number}</p>
                      </div>
                      <div className="add">
                        <i class="fa fa-envelope"></i>
                        <p> {item.email}</p>
                      </div>
                      <div className="add">
                        <i class="fa fa-map-marker"></i>
                        <p> {item.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : "no records"}
        </div>
      </div>
    </div>
  );
};

export default AllVendors;

//------------------drop down bar mai filter----------------
// const filterExperts = () => {
//   let filteredRecords = allExperts;

//   if (searchTerm) {
//     filteredRecords = filteredRecords.filter((item) =>
//       item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   if (spe) {
//     filteredRecords = filteredRecords.filter(
//       (item) => item.speciality === spe
//     );
//   }

//   setexp(filteredRecords);
// };
