import React, { useState, useEffect, useCallback } from "react";
import * as bootstrap from "bootstrap";

function EditEmp({ empId, onEmployeeUpdated }) {
  const [employee, setEmployee] = useState(null);
  console.log("empId", empId);
  const getData = useCallback(() => {
    console.log("Fetching data...");
    const requestOptions = {
      method: "GET",
      headers: {
        accept: "text/plain",
      },
      redirect: "follow",
    };

    fetch(`http://192.168.0.6:5259/api/Employees/${empId}`, requestOptions)
      .then((response) => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return null;
      })
      .then((result) => {
        console.log("Parsed data:", result);
        setEmployee(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [empId]);

  useEffect(() => {
    getData();
  }, [getData, empId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee:", employee);
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        id: empId,
        name: employee.name,
        email: employee.email,
        phoneNo: employee.phoneNo,
        hireDate: employee.hireDate,
        salary: employee.salary || 0,
      }),
    };

    fetch(`http://192.168.0.6:5259/api/Employees/${empId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        }
        return null;
      })
      .then((data) => {
        alert("Update successful");
        // Close modal after successful update
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("editEmployeeModal")
        );
        modal.hide();
        onEmployeeUpdated();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };
  return (
    <div id="editEmployeeModal" className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h4 className="modal-title">Edit Employee</h4>
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
                  required
                  value={employee?.name || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={employee?.email || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Phone No</label>
                <textarea
                  className="form-control"
                  required
                  value={employee?.phoneNo || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, phoneNo: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="form-group">
                <label>Hire Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={
                    employee?.hireDate
                      ? new Date(employee.hireDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    setEmployee({
                      ...employee,
                      hireDate: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="form-group">
                <label>salary</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={employee?.salary || ""}
                  onChange={(e) =>
                    setEmployee({ ...employee, salary: e.target.value })
                  }
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
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmp;
