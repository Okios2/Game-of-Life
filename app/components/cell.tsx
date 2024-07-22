import styles from "./cell.module.css";

const Cell = ({ isAlive, setIsAlive }: { isAlive: boolean, setIsAlive: (arg: boolean) => void }) => {
  return (
    <div className={`${styles.cell} ${isAlive ? styles.alive : styles.dead}`} onClick={() => {setIsAlive(!isAlive)}} />
  );
};

export default Cell;
