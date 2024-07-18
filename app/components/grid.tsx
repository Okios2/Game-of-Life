'use client';
import React, { useState } from "react";

import Cell from "./cell";
import ResetButton from "./resetbutton";
import QueenBeePattern from "./queenpattern";

const GameBoard = () => {
  const [grid, setGrid] = useState<boolean[][]>(
    Array.from(
      {length:50},
      () => Array.from(
        {length: 50}, 
        () => false,
      ),
    )
  );

  const randomGrid = () => {
    setGrid(
      Array.from(
        {length:50},
        () => Array.from(
          {length: 50}, 
          () => Math.random() < 0.5,
        ),
      )
    );
  };

  const queenBeeGrid = (pattern: boolean[][]) => {
    const newGrid = (
      Array.from(
        {length:50},
        () => Array.from(
          {length: 50}, 
          () => false,
        ),
      )
    );

    const pRows = pattern.length;
    const pCols = pattern[0].length;
    const startRow = Math.floor((50 - pRows) / 2);
    const startCol = Math.floor((50 - pCols) / 2);

    for (let row = 0; row < pRows; row++) {
      for (let col = 0; col < pCols; col++) {
          newGrid[startRow + row][startCol + col] = pattern[row][col];
      }
    }

    setGrid(newGrid)
  };
  
  return (
    <div style={{ boxShadow: '3px 3px 10px rgba(0, 0, 0, 0.4)' }}>
      <ResetButton onClick={() => queenBeeGrid(QueenBeePattern())}  name = "Queen Bee Pattern"/>
      <ResetButton onClick={randomGrid} name = "Random Pattern"/>
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
