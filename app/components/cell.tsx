import '../css/cell.css';

const Cell = ({ isAlive }: { isAlive: boolean }) => {
  return (
    <div className={`cell ${isAlive ? 'alive' : 'dead'}`} />
  );
};

export default Cell;
