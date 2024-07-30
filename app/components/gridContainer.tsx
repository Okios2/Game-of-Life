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
    const [patternIndex, setPatternIndex] = useState(0);
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
    
    const handleEnterPressed = (e: React.KeyboardEvent) => {
        if(e.key === "Enter" && !isRunning){
            const active = document.activeElement as HTMLElement;
            const excludedTags = ["BUTTON", "INPUT", "SELECT"];
            if (excludedTags.includes(active.tagName)) {return;}
            patterns[patternIndex].reset();
            setPatternIndex((patternIndex+1)%patterns.length);
        }
    };

    return (
        <div className={styles.center} onKeyDown={handleEnterPressed} tabIndex={0}>
            <div className={styles.buttonscontainer}>     
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
            </div>
            <div className={styles.gridcontainer}>
                <GameBoard isRunning={isRunning} ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
