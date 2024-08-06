'use client'
import {ChangeEvent, SetStateAction, useRef, useState} from "react";

import ActionButton from "./actionbutton";
import GameBoard from "../components/grid";
import styles from "../page.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [rows, setRows] = useState(50);
    const [cols, setCols] = useState(50);
    const [fps, setFps] = useState(30);
    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void, nextGrid: () => void}>();
    const resetToQeenBeeGrid = () => gridRef.current?.setPattern(queenBeePattern);
    const resetToRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const resetToTumblerGrid = () => gridRef.current?.setPattern(tumblerPattern);
    const resetToBlank = () => gridRef.current?.setPattern([[]]);
    const setNextGeneration = () => gridRef.current?.nextGrid();
    const handleSimulation = () => setIsRunning(!isRunning);
    const patterns = [
        {reset: resetToQeenBeeGrid, name: "Queen Bee Pattern"},
        {reset: resetToTumblerGrid, name: "Tumbler Pattern"},
        {reset: resetToRandomGrid, name: "Random Pattern"}
    ];
    
    const handleKeyPressed = (e: React.KeyboardEvent) => ["Enter", " ", "Escape"].includes(e.key) && (() =>{
        e.preventDefault();
        if(e.key === " "){
            handleSimulation();
        } else if(e.key === "Escape"){
            resetToBlank();
            setIsRunning(false);
        } else if (!isRunning){
            setNextGeneration();
        }
    })();

    const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: SetStateAction<number>) => void) => {
        const {min, max, value} = e.target;
        setter(Math.min(Number(max), Math.max(Number(min), Number(value))));
    }

    return (
        <div className={styles.center} onKeyDown={handleKeyPressed} tabIndex={0}>
            <div className={styles.buttonscontainer}>   
                <label htmlFor="rowsInput" >Number of rows:</label>
                <input
                    id="rowsInput"
                    name="rowsInput"
                    type="number"
                    value={rows}
                    onChange={(e) => handleGridSizeChange(e, setRows)}
                    min={1}
                    max={50}
                    disabled={isRunning}
                />
                <label htmlFor="colsInput" >Number of colums:</label>
                <input
                    id="colsInput"
                    name="colsInput"
                    type="number"
                    value={cols}
                    onChange={(e) => handleGridSizeChange(e, setCols)}
                    min={1}   
                    max={50}
                    disabled={isRunning}                    
                />
                <ActionButton onClick={resetToBlank} name="Clear Board" disabled={isRunning}/>
                {patterns.map((pattern) => (
                    <ActionButton
                        key={pattern.name}
                        onClick={pattern.reset}
                        name={pattern.name}
                        disabled={isRunning}
                    />
                ))}
                <ActionButton onClick={setNextGeneration}  name="Next Generation" disabled={isRunning}/>
                <ActionButton onClick={handleSimulation} name={isRunning ? "Pause" : "Play"}/>
                <input 
                    type="range"
                    id="speed-animation"
                    name="speed-animation"
                    value={fps}
                    onChange={(e) => {setFps(Number(e.target.value))}}
                    min={1}
                    max={60}
                />
                <label htmlFor="speed-animation">Animation Speed</label>
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard key={`${rows}x${cols}`} isRunning={isRunning} rows={rows} cols={cols} ref={gridRef} fps={fps}/>
            </div>
        </div>
    )
}

export default GridContainer;
