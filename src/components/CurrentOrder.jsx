import React from "react";
import "./CurrentOrder.css";

const CurrentOrder = ({ table }) => {
  return (
    <div className="order__container">
      <h4 className="order__title">Current Order</h4>
      <ul className="order__list">
        {table.orders.length > 0 ? (
          table.orders.map((dish, index) => (
            <li key={index} className="order__item">
              {dish.name} - ${dish.price}
            </li>
          ))
        ) : (
          <p className="order__empty">No orders yet.</p>
        )}
      </ul>
      <p className="order__total">Total Bill: ${table.totalBill.toFixed(2)}</p>
    </div>
  );
};

export default CurrentOrder;
