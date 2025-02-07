import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import AddEmp from "./root/AddEmp";
import EditEmp from "./root/EditEmp";
import DeleteEmp from "./root/DeleteEmp";
import EmployeeTableRow from "./root/EmployeeTableRow";

function App() {
  const [employees, setEmployees] = useState([]);
  const [empId, setEmpId] = useState(0);
  const getData = () => {
    console.log("Fetching data...");
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://192.168.0.6:5259/api/Employees", requestOptions)
      .then((response) => {
        console.log("Response received:", response);
        return response.json();
      })
      .then((result) => {
        console.log("Parsed data:", result);
        setEmployees(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    //Get Data
    getData();
  }, []);

  useEffect(() => {
    // Activate tooltip
    let tooltips = document.querySelectorAll('[data-toggle="tooltip"]');
    tooltips.forEach(function (tooltip) {
      new bootstrap.Tooltip(tooltip); // Bootstrap's Tooltip activation
    });

    // Select/Deselect checkboxes
    let selectAll = document.getElementById("selectAll");
    let checkboxes = document.querySelectorAll(
      "table tbody input[type='checkbox']"
    );

    if (selectAll) {
      selectAll.addEventListener("click", function () {
        checkboxes.forEach(function (checkbox) {
          checkbox.checked = selectAll.checked;
        });
      });
    }

    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("click", function () {
        if (!this.checked) {
          selectAll.checked = false;
        }
      });
    });
  }, []);

  return (
    <>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-6">
                  <h2>
                    Manage <b>Employees</b>
                  </h2>
                </div>
                <div className="col-sm-6">
                  <a
                    href="#addEmployeeModal"
                    className="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#addEmployeeModal"
                  >
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>Add New Employee</span>
                  </a>
                  {/* <a
                    href="#deleteEmployeeModal"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                  >
                    <i className="material-icons">&#xE15C;</i>{" "}
                    <span>Delete</span>
                  </a> */}
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  {/* <th>
                    <span className="custom-checkbox">
                      <input type="checkbox" id="selectAll" />
                      <label htmlFor="selectAll"></label>
                    </span>
                  </th> */}
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Hire Date</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <EmployeeTableRow
                    key={index}
                    index={index}
                    employee={employee}
                    onEmpIdChanged={setEmpId}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddEmp onEmployeeAdded={getData} />
      <EditEmp empId={empId} onEmployeeUpdated={getData} />
      <DeleteEmp />
    </>
  );
}

export default App;
