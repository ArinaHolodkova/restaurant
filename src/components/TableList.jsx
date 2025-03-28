import React, { useState, useEffect } from "react";
import { tables } from "../Data";
import CurrentOrder from "./CurrentOrder";
import Order from "./Order";
import Reservation from "./Reservation";
import Bingo from "./bingo";
import Filter from "./Filter";

const TableList = () => {
  const [tableData, setTableData] = useState(tables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [viewingMode, setViewingMode] = useState(null);
  const [swapMode, setSwapMode] = useState(false);
  const [swapFromTable, setSwapFromTable] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("All");

  const updateTable = (id, updates) => {
    const updatedTables = tableData.map((table) =>
      table.id === id ? { ...table, ...updates } : table
    );
    setTableData(updatedTables);
    localStorage.setItem("tableData", JSON.stringify(updatedTables));
  };

  useEffect(() => {
    const saved = localStorage.getItem("tableData");
    if (saved) {
      setTableData(JSON.parse(saved));
    }
  }, []);

  const getDisplayStatus = (table) => {
    if (table.isDirty) return "Dirty";
    if (table.isReserved && table.isTaken) return "Reserved + Taken";
    if (table.isTaken) return "Taken";
    if (table.isReserved) return "Reserved";
    return "Available";
  };

  const cancelReservation = (id) => {
    updateTable(id, {
      reservation: null,
      isReserved: false,
    });
  };

  const payTable = (id) => {
    updateTable(id, {
      isTaken: false,
      isDirty: true,
    });
  };

  const cleanTable = (id) => {
    updateTable(id, {
      isDirty: false,
      currentOrder: null,
    });
  };

  const handleSwapRequest = (table) => {
    if (!swapFromTable) {
      setSwapFromTable(table);
    } else {
      const updatedTables = tableData.map((t) => {
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
        {tableData
          .filter((table) => {
            if (selectedTable && !swapMode) {
              return selectedTable.id === table.id;
            }
            if (currentFilter === "All") return true;
            if (currentFilter === "Taken") return table.isTaken;
            if (currentFilter === "Reserved") return table.isReserved;
            if (currentFilter === "Dirty") return table.isDirty;
            if (currentFilter === "Available")
              return !table.isTaken && !table.isReserved && !table.isDirty;
            return false;
          })
          .map((table) => {
            const status = getDisplayStatus(table);
            return (
              <div key={table.id}>
                <button
                 className={`table ${
                  table.isTaken
                    ? "taken"
                    : table.isReserved
                    ? "reserved"
                    : table.isDirty
                    ? "dirty"
                    : "available"
                }`}
                  onClick={() =>
                    swapMode
                      ? handleSwapRequest(table)
                      : setSelectedTable((prev) =>
                          prev?.id === table.id ? null : table
                        )
                  }
                >
                  Table {table.id} - {status}
                </button>

                {selectedTable?.id === table.id && !swapMode && (
                  <div className="inside__table">
                    <h3>Table {table.id}</h3>

                    {!table.isDirty && (
                      <>
                        {(!table.isTaken && !table.isReserved) ||
                        (table.isReserved && !table.isTaken) ? (
                          <>
                            <button
                              className={`button ${viewingMode === "current" ? "button__active" : ""}`}
                              onClick={() => setViewingMode("current")}
                            >
                              View Current Order
                            </button>
                            <button
                              className={`button ${viewingMode === "order" ? "button__active" : ""}`}
                              onClick={() => setViewingMode("order")}
                            >
                              Order
                            </button>
                            <button
                              className={`button ${viewingMode === "reservation" ? "button__active" : ""}`}
                              onClick={() => setViewingMode("reservation")}
                            >
                              Reservation
                            </button>
                          </>
                        ) : (
                          <>
                            {table.isTaken && (
                              <button
                                className={`button ${viewingMode === "current" ? "button__active" : ""}`}
                                onClick={() => setViewingMode("current")}
                              >
                                View Current Order
                              </button>
                            )}
                            {table.isReserved && (
                              <button
                                className={`button ${viewingMode === "reservation" ? "button__active" : ""}`}
                                onClick={() => setViewingMode("reservation")}
                              >
                                Reservation
                              </button>
                            )}
                          </>
                        )}
                      </>
                    )}

                    {!table.isDirty && (
                      <>
                        {viewingMode === "current" && <CurrentOrder table={table} />}
                        {viewingMode === "order" && (
                          <Order
                            table={table}
                            updateTable={updateTable}
                            setSelectedTable={setSelectedTable}
                            setViewingMode={setViewingMode}
                          />
                        )}
                        {viewingMode === "reservation" && (
                          <>
                            {table.reservation ? (
                              <div>
                                <h4>Reservation Details</h4>
                                <p>
                                  <strong>Time:</strong> {table.reservation.time}
                                </p>
                                <p>
                                  <strong>People:</strong> {table.reservation.people}
                                </p>

                                {table.reservation.allergies?.length > 0 && (
                                  <p>
                                    <strong>Allergies:</strong>{" "}
                                    {table.reservation.allergies.join(", ")}
                                  </p>
                                )}

                                {table.reservation.preOrder?.length > 0 && (
                                  <>
                                    <p>
                                      <strong>Pre-Ordered Dishes:</strong>
                                    </p>
                                    <ul style={{ padding: 0, listStyleType: "none" }}>
                                      {table.reservation.preOrder.map((dish, index) => (
                                        <li key={index}>• {dish.name}</li>
                                      ))}
                                    </ul>
                                  </>
                                )}

                                <button className="button" onClick={() => cancelReservation(table.id)}>
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
                      </>
                    )}

                    {table.isTaken && (
                      <div className="pay">
                        <h4 className="pay__title">Finish & Pay</h4>
                        <p className="pay__select">Select payment method:</p>
                        <button className="pay__button" onClick={() => payTable(table.id)}>
                          Card
                        </button>
                        <button className="pay__button" onClick={() => payTable(table.id)}>
                          Cash
                        </button>
                      </div>
                    )}

                    {table.isDirty && (
                      <div style={{ marginBottom: "1rem" }}>
                        <h4>This table needs cleaning.</h4>
                        <button className="button" onClick={() => cleanTable(table.id)}>
                          Clean Table
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <Bingo />
    </div>
  );
};

export default TableList;
