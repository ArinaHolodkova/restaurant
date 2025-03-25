import React, { useState } from "react";
import { menu } from "../Data";

const OrderManagement = ({ table, updateTable, setSelectedTable }) => {
  const [order, setOrder] = useState(table.orders);
  const [allergies, setAllergies] = useState(table.allergies);
  const [totalBill, setTotalBill] = useState(table.totalBill);
  const [status, setStatus] = useState(table.status);

  const handleOrderChange = (dish) => {
    const updatedOrder = [...order, dish];
    const updatedBill = totalBill + dish.price;
    setOrder(updatedOrder);
    setTotalBill(updatedBill);
  };

  const saveChanges = () => {
    updateTable(table.id, { orders: order, allergies, totalBill, status });
    setSelectedTable(null);
  };

  return (
    <div>
      <h4>Place Order</h4>
      <label>Allergies: <input type="text" value={allergies} onChange={e => setAllergies(e.target.value)} /></label>
      <p>Total Bill: ${totalBill.toFixed(2)}</p>
      <label>Status:
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Available</option>
          <option>Taken</option>
        </select>
      </label>
      <h4>Menu</h4>
      <div>
        {menu.map(dish => (
          <button key={dish.id} onClick={() => handleOrderChange(dish)}>
            {dish.name} - ${dish.price}
          </button>
        ))}
      </div>
      <button onClick={saveChanges}>Save</button>
    </div>
  );
};

export default OrderManagement;
