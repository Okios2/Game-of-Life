'use client';
import React, { useState } from "react";

import Cell from "./cell";

const GameBoard = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from(
      {length:50},
      () => Array.from(
        {length: 50}, 
        () => Math.random() < 0.5,
      ),
    )
  );
  
  return (
    <div style={{ boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4)' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(50, 15px)',
          gridTemplateRows: 'repeat(50, 15px)',
          gap: '0.5px',
        }}
      >
        {grid.map((row: boolean[], rowIndex: number) => (
          row.map((cell: boolean, cellIndex: number) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              isAlive={cell}
            />
          ))
        ))}
      </div>
    </div>
  );
};
  
export default GameBoard;
