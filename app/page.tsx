'use client'
import { useRef } from "react";

import styles from "./page.module.css";
import GameBoard from "./components/grid";
import ResetButton from "./components/resetbutton";
import queenBeePattern from "./patterns/queenBee";

export default function Home() {

  const gridRef = useRef<{queenBeeGrid: (queenBeePattern: boolean[][]) => void}>();

  const handleQueenBee = () => gridRef.current?.queenBeeGrid(queenBeePattern);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>GAME OF LIFE</h1>
      </div>
      <div>
        <ResetButton onClick={handleQueenBee}  name="Queen Bee Pattern"/>
      </div>
      <div className={styles.center}>
        <GameBoard ref={gridRef} />
      </div>
    </main>
  );
}
