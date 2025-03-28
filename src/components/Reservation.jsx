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
      allergies,
      preOrder,
    };
    updateTable(table.id, {
      status: "Reserved",
      reservation,
    });
    setSelectedTable(null);
  };

  return (
    <div className="reservation">
      <h4 className="reservation__heading">Reserve Table</h4>

      <div className="reservation__section">
        <label className="reservation__label">
          Number of people:
          <input
            type="number"
            min="1"
            className="reservation__input"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
          />
        </label>

        <label className="reservation__label">
          Reservation time:
          <input
            type="time"
            className="reservation__input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>
      </div>

      <h4 className="reservation__subheading">Allergies</h4>
      <div className="reservation__allergies">
        {commonAllergies.map((item, index) => (
          <label key={index} className="reservation__allergy-option">
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

        <label className="reservation__allergy-option">
          <input
            type="text"
            className="reservation__input reservation__input--small"
            placeholder="Other allergy"
            onBlur={(e) => {
              const value = e.target.value.trim();
              if (value && !allergies.includes(value)) {
                setAllergies([...allergies, value]);
              }
            }}
          />
          <span className="reservation__note">(Press enter or click out to add)</span>
        </label>
      </div>

      {!orderingNow && (
        <div className="reservation__preorder">
          <h4 className="reservation__subheading">Pre-order Menu</h4>

          <div className="menu">
            {menu.map((dish) => (
              <button
                className="reservation__button"
                key={dish.id}
                onClick={() => handleDishSelect(dish)}
              >
                {dish.name} - ${dish.price}
              </button>
            ))}
          </div>

          <ul className="reservation__preorder-list">
            {preOrder.map((dish, index) => (
              <li key={index}>{dish.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="reservation__footer">
                  <label className="reservation__toggle">
            <input
              type="checkbox"
              checked={orderingNow}
              onChange={() => setOrderingNow(!orderingNow)}
            />
            Order on the spot instead
          </label>
          
        <button className="reservation__submit" onClick={handleSubmit}>
          Reserve
        </button>
      </div>
    </div>
  );
};

export default Reservation;
