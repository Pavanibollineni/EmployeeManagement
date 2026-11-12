import { useEffect, useState } from "react";

const emptyEmployee = {
  name: "",
  email: "",
  phone: "",
  department: "",
  salary: "",
};

function EmployeeForm({ onSubmit, editingEmployee, onCancel }) {
  const [formData, setFormData] = useState(emptyEmployee);

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        phone: editingEmployee.phone || "",
        department: editingEmployee.department || "",
        salary: editingEmployee.salary || "",
        id: editingEmployee.id,
      });
    } else {
      setFormData(emptyEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.salary
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const employee = {
      ...(editingEmployee ? { id: editingEmployee.id } : {}),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      salary: Number(formData.salary),
    };

    await onSubmit(employee);

    if (!editingEmployee) {
      setFormData(emptyEmployee);
    }
  };

  return (
    <section className="form-card">
      <div className="section-title">
        <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
        <p>
          {editingEmployee
            ? "Update employee information"
            : "Enter employee information"}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              placeholder="e.g. IT, HR, Finance"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              name="salary"
              type="number"
              min="0"
              placeholder="Enter salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="primary-button">
            {editingEmployee ? "Update Employee" : "Add Employee"}
          </button>

          {editingEmployee && (
            <button
              type="button"
              className="secondary-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default EmployeeForm;