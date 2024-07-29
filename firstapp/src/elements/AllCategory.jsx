import axios from "axios";
import React, { useEffect, useState } from "react";
import URL from "../config";

const AllCategory = () => {
  const [cat, setcat] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [allcat, setallcat] = useState([]);

  useEffect(() => {
    getcat();
  }, []);

  useEffect(() => {
    filterproducts();
  }, [searchTerm]);

  const handlechange = (event) => {
    setsearchTerm(event.target.value);
  };

  const getcat = async () => {
    try {
      const response = await axios.get(`${URL}/getCategory`);
      console.log(response.data.categoryGet);
      setcat(response.data.categoryGet);
      setallcat(response.data.categoryGet);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filterproducts = () => {
    let filterpro = allcat;

    if (searchTerm) {
      filterpro = filterpro.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setcat(filterpro);
  };
  return (
    <div className="expertbox">
      <div className="headingbox">
        <h2>All Categories</h2>
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
      </div>

      <div className="expertcard">
        <div className="card-deck py-5">
          {cat ? (
            cat.map((item) => (
              <div
                className="card m-auto"
                key={item._id}
                style={{ height: "270px" }}
              >
                <img src={`http://localhost:3001/${item.imageUrl}`} />
                {/* <h5 className="card-title text-primary">{item.title}</h5> */}
                <a href={`/filterproducts/${item._id}`} class="link-primary">
                  {item.title}
                </a>

                <p className="card-text text-dark">{item.detail}</p>
                {/* <button type="button" class="btn3 btn-outline-primary">
                  Add to Cart
                </button> */}
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

export default AllCategory;
