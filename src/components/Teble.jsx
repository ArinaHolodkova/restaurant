
const Table = ({ table, swapMode, handleSwapRequest, setSelectedTable }) => {
  return (
    <button
      className={`table ${table.status.toLowerCase()}`} 
      onClick={() => (swapMode ? handleSwapRequest(table) : setSelectedTable(table))}
    >
      Table {table.id} - {table.status}
    </button>
  );
};

export default Table;