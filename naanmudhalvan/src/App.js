import React, { useState } from "react";
import "./App.css";

function App() {
  const [employee, setEmployee] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [filter, setFilter] = useState("");

  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "John",
      date: "2026-06-20",
      reason: "Medical Leave",
      status: "Approved",
    },
    {
      id: 2,
      employee: "Sarah",
      date: "2026-06-22",
      reason: "Personal Work",
      status: "Pending",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee || !leaveDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      employee,
      date: leaveDate,
      reason,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setEmployee("");
    setLeaveDate("");
    setReason("");
  };

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  const filteredLeaves = filter
    ? leaves.filter((leave) =>
        leave.employee.toLowerCase().includes(filter.toLowerCase())
      )
    : leaves;

  return (
    <div className="container">
      <h1>HR Employee Leave Management Tool</h1>

      <form className="leave-form" onSubmit={handleSubmit}>
        <h2>Apply Leave</h2>

        <input
          type="text"
          placeholder="Employee Name"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        />

        <input
          type="date"
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />

        <textarea
          placeholder="Reason for Leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <button type="submit">Apply Leave</button>
      </form>

      <div className="filter-section">
        <h2>Filter by Employee</h2>

        <input
          type="text"
          placeholder="Search Employee"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="history-section">
        <h2>Leave History</h2>

        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.employee}</td>
                <td>{leave.date}</td>
                <td>{leave.reason}</td>
                <td>
                  <span className={leave.status.toLowerCase()}>
                    {leave.status}
                  </span>
                </td>

                <td>
                  {leave.status === "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() =>
                          updateStatus(leave.id, "Approved")
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          updateStatus(leave.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;