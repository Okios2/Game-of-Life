'use client'
import { useRef, useState , useEffect} from "react";

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

    const handleSimulation = () => {
        setIsRunning(!isRunning);
    };

    useEffect(() => {
        let animationId: number | null = null;

        const runSimulation = () => {
            setNextGeneration();
            animationId = requestAnimationFrame(runSimulation);
        };

        if (isRunning) {
            requestAnimationFrame(runSimulation);
        } else if (animationId !== null) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isRunning]);

    return (
        <div>
            <div>
                <ActionButton onClick={resetToBlank}  name="Clear Board"/>
                <ActionButton onClick={resetToQeenBeeGrid}  name="Queen Bee Pattern"/>
                <ActionButton onClick={resetToTumblerGrid}  name="Tumbler Pattern"/>
                <ActionButton onClick={resetToRandomGrid}  name="Random Pattern"/>
                <ActionButton onClick={setNextGeneration}  name="Next Generation"/>
                <ActionButton onClick={handleSimulation} name={isRunning ? "Stop" : "Start"} />
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
