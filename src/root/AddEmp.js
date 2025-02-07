import React, { useState } from "react";
import * as bootstrap from "bootstrap";

function AddEmp({ onEmployeeAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    //hireDate: "",
    salary: 0,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phoneNo,
        //hireDate: formData.hireDate,
        salary: Number(formData.salary),
      }),
    };

    fetch("http://192.168.0.6:5259/api/Employees", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert("Employee added successfully");
        setFormData({
          name: "",
          email: "",
          phoneNo: "",
          address: "",
          //hireDate: "",
          salary: 0,
        });
        onEmployeeAdded();
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("addEmployeeModal")
        );
        modal.hide();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="addEmployeeModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h4 className="modal-title">Add Employee</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="form-group">
                <label>Hire Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
              <div className="form-group">
                <label>Salary</label>
                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEmp;
