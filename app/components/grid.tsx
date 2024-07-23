'use client';
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";

import Cell from "./cell";
import styles from "./grid.module.css";
import createArray from "../utilities/array";

export const rows = 50;
export const cols = 50;

const GameBoard = forwardRef((props, ref: Ref<any>) => {
  const [grid, setGrid] = useState<boolean[][]>(createArray(rows, cols));
  
  const setPattern = (pattern: boolean[][]) => {
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

  const countAliveNeighbors = (grid: boolean[][], x: number, y: number) => {
    let sum = 0;
    for (let localRow = -1; localRow < 2; localRow++){
      for (let localCol = -1; localCol < 2; localCol++) {    
        if (localRow === 0 && localCol === 0) continue;
        //Periodic boundary conditions
        let row = (x + localRow + rows) % rows;
        let col = (y + localCol + cols) % cols;
        if(grid[row][col]) sum++;
      }
    }

    return sum;
  };

  const nextGrid = () => {
    setGrid((currentGrid: boolean[][]) => {
      const newGrid = currentGrid.map((row: boolean[]) => row.slice(0));
      const nRows = currentGrid.length;
      const nCols = currentGrid[0].length;
      for (let row = 0; row < nRows; row++){
        for (let col = 0; col < nCols; col++) {   
          let cell = currentGrid[row][col]; 
          let neighbors = countAliveNeighbors(currentGrid, row, col);

          if(cell && neighbors < 2) newGrid[row][col]=false;
          else if(cell && (neighbors > 1 && neighbors < 4)) newGrid[row][col]=true;
          else if(cell && neighbors > 3) newGrid[row][col]=false;
          else if(!cell && neighbors == 3) newGrid[row][col]=true;
        }
      }
      return newGrid;
    });
  };

  useImperativeHandle(ref, () => ({setPattern, nextGrid}));

  const setIsAlive = (newIsAlive:boolean, rowIndex: number, cellIndex: number) => {
    setGrid((currentGrid: boolean[][]) => {
      const newGrid = currentGrid.map((row: boolean[]) => row.slice(0));
      newGrid[rowIndex][cellIndex] = newIsAlive;
      return newGrid;
    });
  }
  
  return (
    <div className={styles.grid}
    style={{
      gridTemplateColumns: `repeat(${cols}, 15px)`,
      gridTemplateRows: `repeat(${rows}, 15px)`,
    }}
    >
      {grid.map((row: boolean[], rowIndex: number) => (
        row.map((cell: boolean, cellIndex: number) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            isAlive={cell}
            setIsAlive={(newIsAlive) => setIsAlive(newIsAlive, rowIndex, cellIndex)}
          />
        ))
      ))}
    </div>
  );
});
  
export default GameBoard;
