import React, { useState } from "react";
import "./Bingo.css";

const situations = [
  "Order over $100", "Mean client", "Spilled a drink", "Perfect tip", "Customer compliments food",
  "Long wait time", "Large group", "New staff helped", "Birthday celebration", "Wrong order fixed",
  "5-star review", "Special request", "FREE SPACE", "Kids running around", "Happy hour madness",
  "Late reservation", "Customer asks for manager", "First-time guest", "Busy lunch rush", "Cleaned extra mess",
  "Team high-five moment", "Unexpected allergy", "Broken glass", "Double booking", "Thank you note"
];

const Bingo = () => {
  const [scratched, setScratched] = useState(Array(25).fill(false));
  const [hasWon, setHasWon] = useState(false);

  const handleScratch = (index) => {
    if (scratched[index]) return;
    const updated = [...scratched];
    updated[index] = true;
    setScratched(updated);
    checkBingo(updated);
  };

  const checkBingo = (grid) => {
    const lines = [];

    // Rows
    for (let i = 0; i < 5; i++) {
      lines.push(grid.slice(i * 5, i * 5 + 5));
    }

    // Columns
    for (let i = 0; i < 5; i++) {
      lines.push([grid[i], grid[i + 5], grid[i + 10], grid[i + 15], grid[i + 20]]);
    }

    // Diagonals
    lines.push([grid[0], grid[6], grid[12], grid[18], grid[24]]);
    lines.push([grid[4], grid[8], grid[12], grid[16], grid[20]]);

    for (let line of lines) {
      if (line.every(cell => cell)) {
        setHasWon(true);
        return;
      }
    }
  };

  return (
    <div className="bingo-wrapper">
      <h2>Staff Bingo</h2>
      <div className="bingo-grid">
        {situations.map((situation, index) => (
          <div
            key={index}
            className={`bingo-cell ${scratched[index] ? "scratched" : ""}`}
            onClick={() => handleScratch(index)}
          >
            {situation}
          </div>
        ))}
      </div>
      {hasWon && (
        <div className="bingo-reward">
          🎉 BINGO! You win an 🍦 ice cream!
        </div>
      )}
    </div>
  );
};

export default Bingo;
