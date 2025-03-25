import React, { useState } from "react";
import { tables } from "../Data";
import CurrentOrder from "./CurrentOrder";
import Order from "./Order";
import Reservation from "./Reservation";
import Bingo from "./bingo";

const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingMode, setViewingMode] = useState(null); // 'order' | 'reservation' | 'current'
  const [swapMode, setSwapMode] = useState(false);
  const [swapFromTable, setSwapFromTable] = useState(null);

  const updateTable = (id, updates) => {
    setTableData(prevTables =>
      prevTables.map(table =>
        table.id === id ? { ...table, ...updates } : table
      )
    );
  };

 const cancelReservation = (id) => {
  const table = tableData.find(t => t.id === id);
  const keepStatus = table.status === "Taken" ? "Taken" : "Available";

  updateTable(id, {
    reservation: null,
    status: keepStatus
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

      <div className="table__container">
        {tableData.map((table) => (
          <div key={table.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button
              className={`table ${table.status.toLowerCase()}`}
              onClick={() =>
                swapMode ? handleSwapRequest(table) : setSelectedTable(table)
              }
            >
              Table {table.id} - {table.status}
            </button>

            {selectedTable?.id === table.id && !swapMode && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <h3>Table {table.id}</h3>
                <button onClick={() => setViewingMode("current")}>View Current Order</button>
                <button onClick={() => setViewingMode("order")}>Order</button>
                <button onClick={() => setViewingMode("reservation")}>Reservation</button>

                {/* Mode Logic */}
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
                          <p><strong>Allergies:</strong> {table.reservation.allergies.join(", ")}</p>
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

