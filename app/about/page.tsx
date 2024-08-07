import styles from "./page.module.css";

export default function About() {
	return (
		<div>
			<header className={styles.description}>
				<h1>About Conwey's Game of Life</h1>
			</header>
			<section className={styles.section}>
				<h2>Introduction</h2>
				<p>
					The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
					This game, despite its simple rules, is capable of producing extraordinarily complex behaviors, mirroring the complexity and beauty found in the natural world.
				</p>
			</section>
			<section className={styles.section}>
				<h2>How It Works</h2>
				<p>
					The Game of Life consists of a  two-dimensional grid of cells, each of which  is in one of two possible states: alive or dead.
					The state of each cell evolves over discrete time steps according to a set of rules based on the states of its eight neighbors 
					which are the cells that are horizontally, vertically, or diagonally adjacent.
				</p>
				<figure>
					<figcaption>Rules</figcaption>
					<dl>
						<dt>Underpopulation</dt>
						<dd>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</dd>
						<dt>Overpopulation</dt>
						<dd>Any live cell with more than three live neighbors dies, as if by overpopulation.</dd>
						<dt>Reproduction</dt>
						<dd>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</dd>
						<dt>Stasis</dt>
						<dd>Any live cell with two or three live neighbors lives on to the next generation.</dd>
					</dl>
				</figure>
			</section>
			<section className={styles.section}>
				<h2>Patterns</h2>
				<p>The Game of Life is renowned for the variety of patterns. These patterns are broadly categorized into several types:</p>
				<dl>
					<dt>Still Lifes</dt>
					<dd>These are stable patterns that do not change from one generation to the next, such as the Block or the Beehive.</dd>
					<dt>Oscillators</dt>
					<dd>These patterns return to their initial state after a certain number of generations, cycling through a sequence of states. Examples include the Blinker and the Toad.</dd>
					<dt>Spaceships</dt>
					<dd>These patterns translate themselves across the grid over time. The most famous example is the Glider.</dd>
					<dt>Methuselahs</dt>
					<dd>These patterns take a long time to stabilize or vanish, often producing many different patterns along the way. The Acorn is a classic example.</dd>
				</dl>
			</section>
		</div>
	);
}
