import React, { useState } from "react";
import { menu, allergies as commonAllergies } from "../Data";
import "./Reservation.css";

const Reservation = ({ table, updateTable, setSelectedTable }) => {
  const [people, setPeople] = useState(1);
  const [time, setTime] = useState("");
  const [allergies, setAllergies] = useState(table.allergies || []);
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
   
  <h4 className="step">Allergies</h4>
<div className="allergy-wrapper">
  {commonAllergies.map((item, index) => (
    <label key={index} className="allergy-option">
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

  <label className="allergy-option">
    
    <input
      type="text"
      className="allergy-input"
      placeholder="Other allergy"
      onBlur={(e) => {
        const value = e.target.value.trim();
        if (value && !allergies.includes(value)) {
          setAllergies([...allergies, value]);
        }
      }}
    />
    <span className="allergy-note">(Press enter or click out to add)</span>
  </label>
</div>


      {/* <label>
        <input
          type="checkbox"
          checked={orderingNow}
          onChange={() => setOrderingNow(!orderingNow)}
        />
        Order on the spot
      </label>

      {!orderingNow && (
        <>
          <h4 className="step" >Pre-order Menu</h4>
          {menu.map((dish) => (
            <button className="button" key={dish.id} onClick={() => handleDishSelect(dish)}>
              {dish.name} - ${dish.price}
            </button>
          ))}
          <ul>
            {preOrder.map((dish, index) => (
              <li key={index}>{dish.name}</li>
            ))}
          </ul>
        </>
      )} */}
      {!orderingNow && (
  <>
    <h4 className="step">Pre-order Menu</h4>
    
    <label className="order-now-toggle">
      <input
        type="checkbox"
        checked={orderingNow}
        onChange={() => setOrderingNow(!orderingNow)}
      />
      Order on the spot instead
    </label>

    {menu.map((dish) => (
      <button className="button" key={dish.id} onClick={() => handleDishSelect(dish)}>
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

      <button className="button__main button" onClick={handleSubmit}>Reserve</button>
    </div>
  );
};

export default Reservation;
