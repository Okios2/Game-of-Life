const Cell = ({ isAlive }: { isAlive: boolean }) => {
  return (
    <div
      style={{
        width: 15,
        height: 15,
        border: '0.5px solid black',
        backgroundColor: isAlive ? 'red' : 'white',
      }}
    />
  );
};

export default Cell;
