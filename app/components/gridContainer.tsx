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
        if (isRunning) {
            let animationId: number;
            let deltaTime: number;
            let prevTime = 0;
            const fps = 30;
            const interval = 1000 / fps;

            const runSimulation = (time: number) => {

                deltaTime = time - prevTime;
                if(deltaTime >= interval){
                    setNextGeneration();
                    prevTime = time - (deltaTime % time);
                }
                animationId = requestAnimationFrame(runSimulation);
            };
    
            animationId = requestAnimationFrame(runSimulation);
    
            return () => {
                cancelAnimationFrame(animationId);
            };
        }
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
