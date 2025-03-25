import React, { useState } from "react";
import { tables } from "../Data";
import CurrentOrder from "./CurrentOrder";
import Order from "./Order";
import Reservation from "./Reservation";
import Bingo from "./components/Bingo";

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
      <button className="swap" onClick={() => setSwapMode(!swapMode)}>
        {swapMode ? "Cancel Swap" : "Swap Tables"}
      </button>
 <div className="table__container">
  {tableData.map((table) => (
    <div key={table.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <button
        className={`table ${table.status.toLowerCase()}`}
        onClick={() => swapMode ? handleSwapRequest(table) : setSelectedTable(table)}
      >
        Table {table.id} - {table.status}
      </button>

      {selectedTable?.id === table.id && !swapMode && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <h3>Table {table.id}</h3>
          <button onClick={() => setViewingOrder("current")}>View Current Order</button>
          <button onClick={() => setViewingOrder("place")}>Place Order</button>
          <button onClick={() => setViewingOrder("reserve")}>Reserve</button>

          {viewingOrder === "current" && <CurrentOrder table={table} />}
          {viewingOrder === "place" && (
            <Order
              table={table}
              updateTable={updateTable}
              setSelectedTable={setSelectedTable}
            />
          )}
          {viewingOrder === "reserve" && (
            <Reservation
              table={table}
              updateTable={updateTable}
              setSelectedTable={setSelectedTable}
            />
          )}
        </div>
      )}
    </div>
  ))}
</div>
    </div>
  );
};

export default TableList;
