'use client';
import React, { forwardRef, Ref, useImperativeHandle, useRef, useState } from "react";

import Cell from "./cell";
import createArray from "../utilities/array";
import '../css/grid.css';


const rows = 50;
const cols = 50;

const GameBoard = forwardRef((props, ref: Ref<any>) => {
  const [grid, setGrid] = useState<boolean[][]>(createArray(rows, cols));

  const randomGrid = () => {
    setGrid(
      Array.from(
        {length:rows},
        () => Array.from(
          {length: cols}, 
          () => Math.random() < 0.5,
        ),
      )
    );
  };

  const queenBeeGrid = (pattern: boolean[][]) => {
    const newGrid = createArray(rows, cols);
    const pRows = pattern.length;
    const pCols = pattern[0].length;
    const startRow = Math.floor((rows - pRows) / 2);
    const startCol = Math.floor((cols - pCols) / 2);

    for (let row = 0; row < pRows; row++) {
      for (let col = 0; col < pCols; col++) {
          newGrid[startRow + row][startCol + col] = pattern[row][col];
      }
    }

    setGrid(newGrid)
  };

  useImperativeHandle(ref, () => ({queenBeeGrid}));
  
  return (
      <div className='grid'>
        {grid.map((row: boolean[], rowIndex: number) => (
          row.map((cell: boolean, cellIndex: number) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              isAlive={cell}
            />
          ))
        ))}
      </div>
  );
});
  
export default GameBoard;
