'use client'
import { useRef } from "react";

import GameBoard from "../components/grid";
import ResetButton from "../components/resetbutton";
import styles from "../page.module.css";
import queenBeePattern from "../patterns/queenBee";

const GridContainer = () => {
    const gridRef = useRef<{queenBeeGrid: (queenBeePattern: boolean[][]) => void}>();
    const handleQueenBee = () => gridRef.current?.queenBeeGrid(queenBeePattern);

    return (
        <div>
            <div>
                <ResetButton onClick={handleQueenBee}  name="Queen Bee Pattern"/>
            </div>
            <div className={styles.center}>
                <GameBoard ref={gridRef} />
            </div>
        </div>
    )
}

export default GridContainer;
