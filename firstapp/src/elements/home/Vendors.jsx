import React, { useEffect, useState } from "react";
import petshop1 from "../images/petshop1.jpg";
import axios from "axios";
import URL from "../../config";

const Vendors = () => {
  const [ven, setven] = useState([]);

  useEffect(() => {
    getven();
  }, []);

  const getven = async () => {
    try {
      const response = await axios.get(`${URL}/getvendor`);
      console.log(response.data.vendorGet);
      setven(response.data.vendorGet);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="expert-container">
      <h1 className="text-center">Vendors</h1>
      <div className="catecard">
        <div className="card-deck py-5">
          {ven ? (
            ven.slice(0, 5).map((item) => (
              <div className="card" key={item._id}>
                <img src={petshop1} alt=".." />

                <div className="card-body text-center">
                  <h4 className="card-title text-primary">
                    {item.businessName}
                  </h4>
                  <h4 className="card-title text-dark">
                    {" "}
                    Owner Name:{item.name}
                  </h4>
                  {/* <h5 className="card-title text-dark">${item.price}</h5>
                  <p className="card-text">{item.detail}</p> */}
                </div>
              </div>
            ))
          ) : (
            <p>No records</p>
          )}
        </div>
      </div>
      <div className="d-grid gap-2 col-6 mx-auto">
        <a
          href={"/allvendors"}
          class="btn btn-outline-primary"
          role="button"
          aria-pressed="true"
          // style={{ marginBottom: "10px" }}
        >
          View More
        </a>
      </div>
    </div>
  );
};

export default Vendors;
