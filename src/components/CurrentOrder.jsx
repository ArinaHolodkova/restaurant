import React from "react";

const CurrentOrder = ({ table }) => {
  return (
    <div>
      <h4>Current Order</h4>
      <ul>
        {table.orders.length > 0 ? (
          table.orders.map((dish, index) => (
            <li key={index}>{dish.name} - ${dish.price}</li>
          ))
        ) : (
          <p>No orders yet.</p>
        )}
      </ul>
      <p>Total Bill: ${table.totalBill.toFixed(2)}</p>
    </div>
  );
};

export default CurrentOrder;
