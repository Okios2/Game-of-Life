'use client';
import React, {forwardRef, Ref, useImperativeHandle, useState, useEffect} from "react";

import Cell from "./cell";
import createArray from "../utilities/array";
import countAliveNeighbors from "../utilities/countAliveNeighbors";

const minCellSize = 10;
const gapWidth = 1;


const GameBoard = forwardRef(({isRunning, rows, cols, fps}: {isRunning: boolean, rows: number, cols: number, fps: number}, ref: Ref<any>) => {
  const [grid, setGrid] = useState<boolean[][]>(createArray(rows, cols));
  const minWidth = (cols*minCellSize)+gapWidth*(cols-1);
  const interval = 1000 / fps;
  
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
    if (isRunning) {
      let animationId: number;
      let prevTime = Number(document.timeline.currentTime);
      let elapsedTime = 0;

      const runSimulation = (currentTime: number) => {
        const deltaTime = currentTime - prevTime;
        elapsedTime += deltaTime;

        while(elapsedTime >= interval){
          nextGrid();
          elapsedTime -= interval;
        }
        animationId = requestAnimationFrame(runSimulation);
        prevTime = currentTime;
      };
      animationId = requestAnimationFrame(runSimulation);

      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, [isRunning]);
  
  return (
    <svg 
      viewBox={`0 0 ${cols} ${rows}`}
      style={{minWidth}}
    >
      {grid.map((row: boolean[], rowIndex: number) => (
        row.map((cell: boolean, cellIndex: number) => (
          <Cell
            key={`${rowIndex}-${cellIndex}`}
            isAlive={cell}
            setIsAlive={(newIsAlive) => !isRunning && setIsAlive(newIsAlive, rowIndex, cellIndex)}
            rectProps={{x: cellIndex, y: rowIndex, width: 1, height: 1, stroke: "black", strokeWidth: 0.05}}
          />
        ))
      ))}
    </svg>
  );
});
  
export default GameBoard;
