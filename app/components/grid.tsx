'use client';
import React, { forwardRef, Ref, useImperativeHandle, useState, useEffect } from "react";

import Cell from "./cell";
import styles from "./grid.module.css";
import createArray from "../utilities/array";
import countAliveNeighbors from "../utilities/countAliveNeighbors";

export const rows = 50;
export const cols = 50;
const minCellSize = 10;
const gapWidth = 0.5;
const minWidth = (cols*minCellSize)+gapWidth*(cols-1)+40; //adding 40 to match padding on the gridContainer

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

  const nextGrid = () => {
    setGrid((currentGrid: boolean[][]) => {
      return (
        currentGrid.map((row: boolean[], rowIndex: number) => {
          return row.map((cell: boolean, cellIndex: number) => {
            const neighbors = countAliveNeighbors(currentGrid, rowIndex, cellIndex);

            if(!cell) {return neighbors === 3;}
            return neighbors > 1 && neighbors < 4;
          })
        })
      )
    })
  };

  useImperativeHandle(ref, () => ({setPattern, nextGrid}));

  const setIsAlive = (newIsAlive:boolean, rowIndex: number, cellIndex: number) => {
    setGrid((currentGrid: boolean[][]) => {
      const newGrid = currentGrid.map((row: boolean[]) => row.slice(0));
      newGrid[rowIndex][cellIndex] = newIsAlive;
      return newGrid;
    });
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--grid-min-width', `${minWidth}px`);
  }, [minWidth]);
  
  return (
    <div 
      className={styles.grid}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(${minCellSize}px, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(${minCellSize}px, 1fr))`,
        gap: gapWidth,
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
