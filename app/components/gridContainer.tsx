'use client'
import { useRef } from "react";

import GameBoard, {rows, cols} from "../components/grid";
import ResetButton from "../components/resetbutton";
import styles from "../page.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {

    const gridRef = useRef<{setPattern: (queenBeePattern: boolean[][]) => void}>();
    const handleQueenBee = () => gridRef.current?.setPattern(queenBeePattern);
    const handleRandomGrid  = () => gridRef.current?.setPattern(randomPattern(rows, cols));
    const handleTumbler = () => gridRef.current?.setPattern(tumblerPattern);

    return (
        <div>
            <div>
                <ResetButton onClick={handleQueenBee}  name="Queen Bee Pattern"/>
                <ResetButton onClick={handleRandomGrid}  name="Random Pattern"/>
                <ResetButton onClick={handleTumbler}  name="Tumbler Pattern"/>
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
