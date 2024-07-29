import React, { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../config";

const Products = () => {
  const [pro, setpro] = useState([]);

  useEffect(() => {
    getpro();
  }, []);

  const getpro = async () => {
    try {
      const response = await axios.get(`${URL}/getproduct`);
      console.log(response.data.productGet);
      setpro(response.data.productGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="category-container"
      style={{ backgroundColor: "aliceblue" }}
    >
      <h1 className="text-center">Products</h1>
      <div className="catecard">
        <div className="card-deck py-5">
          {pro ? (
            pro.slice(0, 5).map((item) => (
              <div className="card" key={item._id}>
                <img src={`http://localhost:3001/${item.imageUrl}`} />

                <div className="card-body text-center">
                  <h4 className="card-title text-primary">{item.title}</h4>
                  <h4 className="card-title text-dark">
                    {" "}
                    {item.category.title}
                  </h4>
                  <h5 className="card-title text-dark">${item.price}</h5>
                  <p className="card-text">{item.detail}</p>
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
          href={"/allproducts"}
          class="btn btn-outline-primary"
          role="button"
          aria-pressed="true"
        >
          View More
        </a>
      </div>
    </div>
  );
};

export default Products;
