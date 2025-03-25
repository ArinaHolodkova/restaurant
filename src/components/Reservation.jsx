import React, { useState } from "react";
import { menu, allergies } from "../Data";

const Reservation = ({ table, updateTable, setSelectedTable }) => {
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState("");
// const [allergies, setAllergies] = useState(table.allergies);
  const [preOrder, setPreOrder] = useState([]);
  const [orderingNow, setOrderingNow] = useState(false);

  const handleDishSelect = (dish) => {
    setPreOrder([...preOrder, dish]);
  };

  const handleSubmit = () => {
    const reservation = {
      type: orderingNow ? "order-on-spot" : "pre-order",
      people,
      time,
      preOrder,
    };
    updateTable(table.id, {
      status: "Reserved",
      reservation,
    });
    setSelectedTable(null);
  };

  return (
    <div>
      <h4>Reserve Table</h4>

      <label>
        Number of people:
        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(Number(e.target.value))}
        />
      </label>

      <label>
        Reservation time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      {/* <label>Allergies: <input type="text" value={allergies} onChange={e => setAllergies(e.target.value)} /></label> */}
   
    <h5>Allergies</h5>
<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
  {allergies.map((item, index) => (
    <label key={index}>
      <input
        type="checkbox"
        value={item}
        checked={allergies.includes(item)}
        onChange={(e) => {
          const value = e.target.value;
          setAllergies((prev) =>
            prev.includes(value)
              ? prev.filter((a) => a !== value)
              : [...prev, value]
          );
        }}
      />
      {item}
    </label>
  ))}

  <label>
    <input
      type="text"
      placeholder="Other allergy"
      onBlur={(e) => {
        const value = e.target.value.trim();
        if (value && !allergies.includes(value)) {
          setAllergies([...allergies, value]);
        }
      }}
    />
    <span style={{ marginLeft: "8px" }}>(Press enter or click out to add)</span>
  </label>
</div>

      <label>
        <input
          type="checkbox"
          checked={orderingNow}
          onChange={() => setOrderingNow(!orderingNow)}
        />
        Order on the spot
      </label>

      {!orderingNow && (
        <>
          <h5>Pre-order Menu</h5>
          {menu.map((dish) => (
            <button key={dish.id} onClick={() => handleDishSelect(dish)}>
              {dish.name} - ${dish.price}
            </button>
          ))}
          <ul>
            {preOrder.map((dish, index) => (
              <li key={index}>{dish.name}</li>
            ))}
          </ul>
        </>
      )}

      <button onClick={handleSubmit}>Reserve</button>
    </div>
  );
};

export default Reservation;
