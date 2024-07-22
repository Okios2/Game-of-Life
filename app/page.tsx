import GridContainer from "./components/gridContainer";
import styles from "./page.module.css";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>GAME OF LIFE</h1>
      </div>
      <div>
        <GridContainer/>  
      </div>
    </main>
  );
}
