import React from "react";

function EmployeeTableRow({ employee, index, onEmpIdChanged }) {
  //Delete Function
  const handleDelete = async () => {
    console.log("Deleting employee:", employee.id);
    try {
      const response = await fetch(
        `http://192.168.0.6:5259/api/Employees/${employee.id}`,
        {
          method: "DELETE",
          headers: {
            accept: "*/*",
          },
        }
      );

      if (response.ok) {
        onEmpIdChanged(employee.id); // Notify parent component about deletion
      } else {
        console.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <tr>
      {/* <td>
        <span className="custom-checkbox">
          <input
            type="checkbox"
            id={`checkbox${employee.id}`}
            name="options[]"
            value={employee.id}
          />
          <label htmlFor={`checkbox${employee.id}`}></label>
        </span>
      </td> */}
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.phoneNo}</td>
      <td>{new Date(employee.hireDate).toLocaleDateString()}</td>
      <td>
        <b>₹ </b>
        {employee.salary.toFixed(2)}
      </td>
      <td>
        <a
          href="#editEmployeeModal"
          className="edit"
          data-bs-toggle="modal"
          onClick={() => onEmpIdChanged(employee.id)}
        >
          <i className="material-icons" data-bs-toggle="tooltip" title="Edit">
            &#xE254;
          </i>
        </a>
        <a
          href="#deleteEmployeeModal"
          className="delete"
          data-bs-toggle="modal"
          onClick={handleDelete}
        >
          <i className="material-icons" data-bs-toggle="tooltip" title="Delete">
            &#xE872;
          </i>
        </a>
      </td>
    </tr>
  );
}

export default EmployeeTableRow;
