'use client'
import { useRef } from "react";

import ActionButton from "./actionbutton";
import GameBoard, {rows, cols} from "../components/grid";
import styles from "../page.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {

    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void, nextGrid: () => void}>();
    const resetToQeenBeeGrid = () => gridRef.current?.setPattern(queenBeePattern);
    const resetToRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const resetToTumblerGrid = () => gridRef.current?.setPattern(tumblerPattern);
    const setNextGeneration = () => gridRef.current?.nextGrid();

    return (
        <div>
            <div>
                <ActionButton onClick={resetToQeenBeeGrid}  name="Queen Bee Pattern"/>
                <ActionButton onClick={resetToRandomGrid}  name="Random Pattern"/>
                <ActionButton onClick={resetToTumblerGrid}  name="Tumbler Pattern"/>
                <ActionButton onClick={setNextGeneration}  name="Next Generation"/>
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
