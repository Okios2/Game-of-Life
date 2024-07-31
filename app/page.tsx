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
      <Link href="/about" className={styles.link}>About Page</Link>
    </main>
  );
}
