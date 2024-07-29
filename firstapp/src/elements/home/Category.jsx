import React, { useEffect, useState } from "react";

import axios from "axios";
import URL from "../../config";
const Category = () => {
  const [cat, setcat] = useState([]);

  useEffect(() => {
    getcat();
  }, [URL]);

  const getcat = async () => {
    try {
      console.log("url", URL);
      const response = await axios.get(`${URL}/getCategory`);
      console.log(response.data.categoryGet);
      setcat(response.data.categoryGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="category-container">
      <h1 className="text-center">Categories</h1>
      <div className="catecard">
        <div className="card-deck py-5">
          {cat ? (
            cat.slice(0, 5).map((item) => (
              <div className="card" key={item._id}>
                <img src={`http://localhost:3001/${item.imageUrl}`} />
                <div className="card-body text-center">
                  <a
                    href={`/filterproducts/${item._id}`}
                    role="button"
                    aria-pressed="true"
                    style={{ textDecoration: "unset" }}
                  >
                    <h5 className="card-title text-primary">{item.title}</h5>
                  </a>
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
          href={"/allcategory"}
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

export default Category;
