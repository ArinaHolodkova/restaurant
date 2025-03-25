import React from "react";

const Filter = ({ currentFilter, setCurrentFilter }) => {
  const statuses = ["All", "Available", "Reserved", "Taken", "Dirty"];

  return (
    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
      <h4>Filter Tables</h4>
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setCurrentFilter(status)}
          style={{
            margin: "0 5px",
            padding: "6px 12px",
            backgroundColor: currentFilter === status ? "#333" : "#eee",
            color: currentFilter === status ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {status}
        </button>
      ))}
    </div>
  );
};

export default Filter;
