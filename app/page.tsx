import GridContainer from "./components/gridContainer";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>GAME OF LIFE</h1>
      </div>
      <GridContainer/>
      <div className={styles.link}>
        <Link href="/about">About Page</Link>
      </div>
    </main>
  );
}
