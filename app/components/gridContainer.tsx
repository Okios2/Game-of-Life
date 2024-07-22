'use client'
import { useRef } from "react";

import styles from "../page.module.css";
import GameBoard from "../components/grid";
import ResetButton from "../components/resetbutton";
import queenBeePattern from "../patterns/queenBee";
import tumblerPattern from "../patterns/tumbler";

const GridContainer = () => {
    const gridRef = useRef<{setPattern: (pattern: boolean[][]) => void}>();
    const handleQueenBee = () => gridRef.current?.setPattern(queenBeePattern);
    const handleTumbler = () => gridRef.current?.setPattern(tumblerPattern);

    return (
        <div>
            <div>
                <ResetButton onClick={handleQueenBee}  name="Queen Bee Pattern"/>
                <ResetButton onClick={handleTumbler}  name="Tumbler Pattern"/>
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
