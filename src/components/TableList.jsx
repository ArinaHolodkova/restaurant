import React, { useState } from "react";
import { tables } from "../Data";
import CurrentOrder from "./CurrentOrder";
import Order from "./Order";
import Reservation from "./Reservation";
import Bingo from "./bingo";
import Filter from "./Filter";
import { useEffect } from "react";

const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingMode, setViewingMode] = useState(null);
  const [swapMode, setSwapMode] = useState(false);
  const [swapFromTable, setSwapFromTable] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");

const updateTable = (id, updates) => {
  const updatedTables = tableData.map(table =>
    table.id === id ? { ...table, ...updates } : table
  );

  setTableData(updatedTables);
  localStorage.setItem("tableData", JSON.stringify(updatedTables));
}

useEffect(() => {
  const saved = localStorage.getItem("tableData");
  if (saved) {
    setTableData(JSON.parse(saved));
  }
}, []);

  const cancelReservation = (id) => {
    const table = tableData.find(t => t.id === id);
    const keepStatus = table.status === "Taken" ? "Taken" : "Available";

    updateTable(id, {
      reservation: null,
      status: keepStatus
    });
  };

  const payTable = (id) => {
    updateTable(id, {
      status: "Dirty"
    });
  };

  const cleanTable = (id) => {
    updateTable(id, {
      status: "Available",
      currentOrder: null
    });
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

     <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

      <div className="table__container">
        {tableData.filter((table) => currentFilter === "All" || table.status === currentFilter).map((table) => (
          <div
            key={table.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
            className={`table ${table.status.toLowerCase()}`}
            onClick={() =>
            swapMode
              ? handleSwapRequest(table)
              : setSelectedTable(prev => (prev?.id === table.id ? null : table))
          }
            >
              Table {table.id} - {table.status}
            </button>

            {selectedTable?.id === table.id && !swapMode && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <h3>Table {table.id}</h3>

                {table.status === "Taken" && (
                  <div style={{ marginBottom: "1rem" }}>
                    <h4>Finish & Pay</h4>
                    <p>Select payment method:</p>
                    <button onClick={() => payTable(table.id)}>Card</button>
                    <button onClick={() => payTable(table.id)}>Cash</button>
                  </div>
                )}

                {table.status === "Dirty" && (
                  <div style={{ marginBottom: "1rem" }}>
                    <h4>This table needs cleaning.</h4>
                    <button onClick={() => cleanTable(table.id)}>Clean Table</button>
                  </div>
                )}

                <button onClick={() => setViewingMode("current")}>View Current Order</button>
                <button onClick={() => setViewingMode("order")}>Order</button>
                <button onClick={() => setViewingMode("reservation")}>Reservation</button>

              
                {viewingMode === "current" && <CurrentOrder table={table} />}

                {viewingMode === "order" && (
                  <Order
                    table={table}
                    updateTable={updateTable}
                    setSelectedTable={setSelectedTable}
                  />
                )}

                {viewingMode === "reservation" && (
                  <>
                    {table.reservation ? (
                      <div>
                        <h4>Reservation Details</h4>
                        <p><strong>Time:</strong> {table.reservation.time}</p>
                        <p><strong>People:</strong> {table.reservation.people}</p>

                        {table.reservation.allergies?.length > 0 && (
                          <p>
                            <strong>Allergies:</strong> {table.reservation.allergies.join(", ")}
                          </p>
                        )}

                        {table.reservation.preOrder?.length > 0 && (
                          <>
                            <p><strong>Pre-Ordered Dishes:</strong></p>
                            <ul style={{ padding: 0, listStyleType: "none" }}>
                              {table.reservation.preOrder.map((dish, index) => (
                                <li key={index}>• {dish.name}</li>
                              ))}
                            </ul>
                          </>
                        )}

                        <button onClick={() => cancelReservation(table.id)}>
                          Cancel Reservation
                        </button>
                      </div>
                    ) : (
                      <Reservation
                        table={table}
                        updateTable={updateTable}
                        setSelectedTable={setSelectedTable}
                      />
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Bingo />
    </div>
  );
};

export default TableList;
