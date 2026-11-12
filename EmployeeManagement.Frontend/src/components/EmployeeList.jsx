import { useState } from "react";

function EmployeeList({ employees, loading, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    return (
      employee.name?.toLowerCase().includes(search) ||
      employee.email?.toLowerCase().includes(search) ||
      employee.department?.toLowerCase().includes(search) ||
      employee.phone?.toLowerCase().includes(search)
    );
  });

  return (
    <section className="list-card">
      <div className="list-header">
        <div>
          <h2>Employees</h2>
          <p>{employees.length} employee(s) stored in the database</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {loading ? (
        <div className="empty-state">
          <p>Loading employees...</p>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="empty-state">
          <p>
            {employees.length === 0
              ? "No employees found. Add your first employee above."
              : "No employees match your search."}
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>₹{Number(employee.salary).toLocaleString("en-IN")}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() => onEdit(employee)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => onDelete(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default EmployeeList;