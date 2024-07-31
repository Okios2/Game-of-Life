import styles from "../page.module.css";
import Link from "next/link";

export default function About() {

  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h1>About Conwey's Game of Life</h1>
      </div>
      <section className={styles.section}>
            <h2>Introduction</h2>
            <p>The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
               This game, despite its simple rules, is capable of producing extraordinarily complex behaviors, mirroring the complexity and beauty found in the natural world.</p>
          </section>
          <section className={styles.section}>
            <h2>How It Works</h2>
            <p>The Game of Life consists of a  two-dimensional grid of cells, each of which  is in one of two possible states: alive or dead.
               The state of each cell evolves over discrete time steps according to a set of rules based on the states of its eight neighbors 
               which are the cells that are horizontally, vertically, or diagonally adjacent.</p>
            <h3>Rules</h3>
            <ul>
              <li><strong>Underpopulation</strong>: Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
              <li><strong>Overpopulation</strong>: Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
              <li><strong>Reproduction</strong>: Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
              <li><strong>Stasis</strong>: Any live cell with two or three live neighbors lives on to the next generation.</li>
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Patterns</h2>
            <p>The Game of Life is renowned for the variety of patterns. These patterns are broadly categorized into several types:</p>
            <ul>
              <li><strong>Still Lifes</strong>: These are stable patterns that do not change from one generation to the next, such as the Block or the Beehive.</li>
              <li><strong>Oscillators</strong>: These patterns return to their initial state after a certain number of generations, cycling through a sequence of states. Examples include the Blinker and the Toad.</li>
              <li><strong>Spaceships</strong>: These patterns translate themselves across the grid over time. The most famous example is the Glider.</li>
              <li><strong>Methuselahs</strong>: These patterns take a long time to stabilize or vanish, often producing many different patterns along the way. The Acorn is a classic example.</li>
            </ul>
          </section>
      <Link href="/" className={styles.link}>Back</Link>
    </main>
  );
}
