import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

const API_URL = "http://localhost:5198/api/Employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch employees.");
      
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const addEmployee = async (employee) => {
    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to add employee.");
      }

      await fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const updateEmployee = async (employee) => {
    try {
      setError("");

      const response = await fetch(`${API_URL}/${employee.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee.");
      }

      await fetchEmployees();
      setEditingEmployee(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteEmployee = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee.");
      }

      await fetchEmployees();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFormSubmit = async (employee) => {
    if (editingEmployee) {
      await updateEmployee(employee);
    } else {
      await addEmployee(employee);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your employees easily</p>
        </div>
      </header>

      <main className="container">
        {error && <div className="error-message">{error}</div>}

        <EmployeeForm
          onSubmit={handleFormSubmit}
          editingEmployee={editingEmployee}
          onCancel={handleCancelEdit}
        />

        <EmployeeList
          employees={employees}
          loading={loading}
          onEdit={handleEdit}
          onDelete={deleteEmployee}
        />
      </main>
    </div>
  );
}

export default App;
