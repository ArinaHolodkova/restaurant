import React, { useState } from "react";
import { tables, menu } from "../Data";

const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(false);
  const [swapMode, setSwapMode] = useState(false);
  const [swapFromTable, setSwapFromTable] = useState(null);

  const updateTable = (id, updates) => {
    setTableData(prevTables => prevTables.map(table => table.id === id ? { ...table, ...updates } : table));
  };

  const handleSwapRequest = (table) => {
    if (!swapFromTable) {
      setSwapFromTable(table);
    } else {
      // Swap table data
      const updatedTables = tableData.map(t => {
        if (t.id === swapFromTable.id) return { ...t, id: table.id };
        if (t.id === table.id) return { ...t, id: swapFromTable.id };
        return t;
      });
      setTableData(updatedTables);
      setSwapFromTable(null);
      setSwapMode(false);
    }
  };

  return (
    <div>
      <h2>Restaurant Tables</h2>
      <button onClick={() => setSwapMode(!swapMode)}>
        {swapMode ? "Cancel Swap" : "Swap Tables"}
      </button>
      <div className="table__container">
        {tableData.map(table => (
          <button  key={table.id} className={`table ${table.status.toLowerCase()}`} 
            onClick={() => swapMode ? handleSwapRequest(table) : setSelectedTable(table)}>
            Table {table.id} - {table.status}
          </button>
        ))}
      </div>
      {selectedTable && !swapMode && (
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
