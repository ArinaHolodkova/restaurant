import React, { useState } from "react";
import { menu, allergies as commonAllergies } from "../Data";

const OrderManagement = ({ table, updateTable, setSelectedTable }) => {
  const [order, setOrder] = useState(table.orders);
  const [allergies, setAllergies] = useState(table.allergies || []);
  const [totalBill, setTotalBill] = useState(table.totalBill);

  const handleOrderChange = (dish) => {
    const updatedOrder = [...order, dish];
    const updatedBill = totalBill + dish.price;
    setOrder(updatedOrder);
    setTotalBill(updatedBill);
  };

  const saveChanges = () => {
    updateTable(table.id, { orders: order, allergies, totalBill });
    setSelectedTable(null);
     updateTable(table.id, {
      status: "Taken",
    });
  };

  return (
    <div>
      <h4>Place Order</h4>

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

    
      <p>Total Bill: ${totalBill.toFixed(2)}</p>
      <h4 className="step">Menu</h4>
      <div>
        {menu.map(dish => (
          <button className="button" key={dish.id} onClick={() => handleOrderChange(dish)}>
            {dish.name} - ${dish.price}
          </button>
        ))}
      </div>
      <button className="button__main button"  onClick={saveChanges}>Save</button>
    </div>
  );
};

export default OrderManagement;
