import React from "react";
import mainlogo from "../images/petcareemoji.png";

const Footer_ = () => {
  return (
    <div>
      <footer className="footer">
        <div className="contain">
          <div className="row" style={{ width: "100%" }}>
            <div
              className="head_quarter col-md-3 m-auto"
              style={{ padding: "23px 0px 0px 0px" }}
            >
              <h5>
                <span className="Span_footer">Head</span> Quarter
              </h5>
              <br />
              <p>212 Barrington Court New York, ABC 10001</p>
              <br />
              <img src={mainlogo} alt="Logo" height="78rem" width="78rem" />
              <p>
                <span className="Span_footer">Copyright</span> © 2024 PetCareHub
              </p>
            </div>
            <div className="head_quarter col-md-3 m-auto">
              <h5>
                <span className="Span_footer">Contact</span> info
              </h5>
              <p>+1 333 4040 5566</p>
              <p>contact@company.com</p>
              <br />
            </div>

            <div className="newsletter col-md-3 m-auto">
              <h5>
                <span className="Span_footer">Newsletter</span> Sign_Up
              </h5>

              <div className="input-group_ mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group_ mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Email_id"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="col-12_">
                <button type="submit" className="btn btn-primary">
                  Submit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer_;
