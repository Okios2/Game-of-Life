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
    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void, nextGrid: () => void}>();
    const resetToQeenBeeGrid = () => gridRef.current?.setPattern(queenBeePattern);
    const resetToRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const resetToTumblerGrid = () => gridRef.current?.setPattern(tumblerPattern);
    const resetToBlank = () => gridRef.current?.setPattern([[]]);
    const setNextGeneration = () => gridRef.current?.nextGrid();
    const handleSimulation = () => setIsRunning(!isRunning);

    const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>, setter: (value: SetStateAction<number>) => void) => {
        const value = Number(e.target.value);
        if(value <= 50) {
            setter(value);
        }
    }

    return (
        <div className={styles.center}>
            <div className={styles.buttonscontainer}>   
                <label>
                    Number of rows: 
                    <input
                        className={styles.imputmargin}
                        type="number"
                        value={rows}
                        onChange={(e) => handleGridSizeChange(e, setRows)}
                        min={1}
                        disabled={isRunning}
                    />
                </label>
                <label>
                    Nukmber of colums: 
                    <input
                        className={styles.imputmargin}
                        type="number"
                        value={cols}
                        onChange={(e) => handleGridSizeChange(e, setCols)}
                        min={1}   
                        disabled={isRunning}                    
                    />
                </label>
                <ActionButton onClick={resetToBlank} name="Clear Board" disabled={isRunning}/>
                <ActionButton onClick={resetToQeenBeeGrid}  name="Queen Bee Pattern" disabled={isRunning}/>
                <ActionButton onClick={resetToTumblerGrid}  name="Tumbler Pattern" disabled={isRunning}/>
                <ActionButton onClick={resetToRandomGrid}  name="Random Pattern" disabled={isRunning}/>
                <ActionButton onClick={setNextGeneration}  name="Next Generation" disabled={isRunning}/>
                <ActionButton onClick={handleSimulation} name={isRunning ? "Pause" : "Play"}/>
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard key={`${rows}x${cols}`} isRunning={isRunning} rows={rows} cols={cols} ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
