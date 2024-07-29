import React, { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); // ... means uske baad store karna and not overwrite it
  };

  const handlesubmit = (event) => {
    try {
      event.preventDefault();
      console.log("formdata", formData);

      const info = localStorage.getItem("contacts");
      const contactInfo = info ? JSON.parse(info) : [];

      contactInfo.push(formData);
      localStorage.setItem("contacts", JSON.stringify(contactInfo));

      Swal.fire({
        title: "Good job!",
        text: "Contact details stored to local storage",
        icon: "success",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="contain_contact">
        <div className="contact_body">
          <p className="text-muted text-center">Contact-Us</p>
          <h3 className="text-center">
            Contact For <span className="text-primary ">Any Query</span>
          </h3>
          <form onSubmit={handlesubmit}>
            <div className="form_box">
              <div className="input-group mb-3">
                <input
                  name="name"
                  value={formData.name}
                  type="text"
                  onChange={handlechange}
                  className="form-control"
                  placeholder=" Your Name"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handlechange}
                  className="form-control"
                  placeholder="Your Email_id"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handlechange}
                  className="form-control"
                  placeholder="Subject"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>

              <div className="input-group md-3">
                <textarea
                  name="message"
                  type="text"
                  value={formData.message}
                  onChange={handlechange}
                  className="form-control"
                  placeholder="Message"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  rows="5"
                />
              </div>

              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
