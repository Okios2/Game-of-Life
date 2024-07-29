'use client'
import {useRef, useState} from "react";

import ActionButton from "./actionbutton";
import GameBoard, {rows, cols} from "../components/grid";
import styles from "../page.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {
    const [isRunning, setIsRunning] = useState(false);
    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void, nextGrid: () => void}>();
    const resetToQeenBeeGrid = () => gridRef.current?.setPattern(queenBeePattern);
    const resetToRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const resetToTumblerGrid = () => gridRef.current?.setPattern(tumblerPattern);
    const resetToBlank = () => gridRef.current?.setPattern([[]]);
    const setNextGeneration = () => gridRef.current?.nextGrid();
    const handleSimulation = () => setIsRunning(!isRunning);

    return (
        <div className={styles.center}>
            <div className={styles.buttonscontainer}>     
                <ActionButton onClick={resetToBlank} name="Clear Board" disabled={isRunning}/>
                <ActionButton onClick={resetToQeenBeeGrid}  name="Queen Bee Pattern" disabled={isRunning}/>
                <ActionButton onClick={resetToTumblerGrid}  name="Tumbler Pattern" disabled={isRunning}/>
                <ActionButton onClick={resetToRandomGrid}  name="Random Pattern" disabled={isRunning}/>
                <ActionButton onClick={setNextGeneration}  name="Next Generation" disabled={isRunning}/>
                <ActionButton onClick={handleSimulation} name={isRunning ? "Pause" : "Play"}/>
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard isRunning={isRunning} ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
