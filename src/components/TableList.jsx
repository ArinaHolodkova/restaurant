import React, { useState } from "react";
import { tables, menu } from "../Data";


const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(false);

  const updateTable = (id, updates) => {
    setTableData(prevTables => prevTables.map(table => table.id === id ? { ...table, ...updates } : table));
  };

  return (
    <div>
      <h2>Restaurant Tables</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {tableData.map(table => (
          <button key={table.id} onClick={() => { setSelectedTable(table); setViewingOrder(false); }}>
            Table {table.id} - {table.status}
          </button>
        ))}
      </div>
      {selectedTable && (
        <div>
          <h3>Table {selectedTable.id}</h3>
          <button onClick={() => setViewingOrder(true)}>View Current Order</button>
          <button onClick={() => setViewingOrder(false)}>Place Order</button>
          {viewingOrder ? (
            <CurrentOrder table={selectedTable} />
          ) : (
            <OrderManagement table={selectedTable} updateTable={updateTable} setSelectedTable={setSelectedTable} />
          )}
        </div>
      )}
    </div>
  );
};

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
    setSelectedTable(null); // Close table view after saving
  };

  return (
    <div>
      <h4>Place Order</h4>
      <label>Allergies: <input type="text" value={allergies} onChange={e => setAllergies(e.target.value)} /></label>
      <p>Total Bill: ${totalBill.toFixed(2)}</p>
      <label>Status:
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option>Available</option>
          <option>Reserved</option>
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

const CurrentOrder = ({ table }) => {
  return (
    <div>
      <h4>Current Order</h4>
      <ul>
        {table.orders.length > 0 ? table.orders.map((dish, index) => (
          <li key={index}>{dish.name} - ${dish.price}</li>
        )) : <p>No orders yet.</p>}
      </ul>
      <p>Total Bill: ${table.totalBill.toFixed(2)}</p>
    </div>
  );
};

export default TableList;