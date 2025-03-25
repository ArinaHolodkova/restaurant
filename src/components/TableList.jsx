import React, { useState } from "react";
import { tables } from "../Data";
import CurrentOrder from "./CurrentOrder";
import OrderManagement from "./Order";

const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(false);
  const [swapMode, setSwapMode] = useState(false);
  const [swapFromTable, setSwapFromTable] = useState(null);

  const updateTable = (id, updates) => {
    setTableData(prevTables =>
      prevTables.map(table =>
        table.id === id ? { ...table, ...updates } : table
      )
    );
  };

  const handleSwapRequest = (table) => {
    if (!swapFromTable) {
      setSwapFromTable(table);
    } else {
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
          <button
            key={table.id}
            className={`table ${table.status.toLowerCase()}`}
            onClick={() => swapMode ? handleSwapRequest(table) : setSelectedTable(table)}
          >
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
            <OrderManagement
              table={selectedTable}
              updateTable={updateTable}
              setSelectedTable={setSelectedTable}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TableList;
