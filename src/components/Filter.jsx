import React from "react";
import "./Filter.css";

const Filter = ({ currentFilter, setCurrentFilter }) => {
  const statuses = ["All", "Available", "Reserved", "Taken", "Dirty"];

  return (
    <div className="filter">
      <h4 className="filter__heading">Filter Tables</h4>
      <div className="filter__buttons">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setCurrentFilter(status)}
            className={`filter__button ${
              currentFilter === status ? "filter__button--active" : ""
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter;
