import styles from "../cell.module.css";

const Cell = ({ isAlive }: { isAlive: boolean }) => {
  return (
    <div className={`${styles.cell} ${isAlive ? styles.alive : styles.dead}`} />
  );
};

export default Cell;
