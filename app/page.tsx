import styles from "./page.module.css";
import GameBoard from "./components/grid";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>GAME OF LIFE</h1>
      </div>
      <div className={styles.center}>
        <GameBoard/>
      </div>
    </main>
  );
}
