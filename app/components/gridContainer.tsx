'use client'
import { useRef } from "react";

import GameBoard from "../components/grid";
import ResetButton from "../components/resetbutton";
import styles from "../page.module.css";
import randomPattern from "../patterns/random";
import queenBeePattern from "../patterns/queenBee";

const GridContainer = () => {
    const gridRef = useRef<{setPattern: (queenBeePattern: boolean[][]) => void}>();
    const handleQueenBee = () => gridRef.current?.setPattern(queenBeePattern);
    const handleRandomGrid  = () => gridRef.current?.setPattern(randomPattern());

    return (
        <div>
            <div>
                <ResetButton onClick={handleQueenBee}  name="Queen Bee Pattern"/>
                <ResetButton onClick={handleRandomGrid}  name="Random Pattern"/>
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
