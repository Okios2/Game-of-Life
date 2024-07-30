const Cell = ({ isAlive, setIsAlive, rectProps }: { isAlive: boolean, setIsAlive: (arg: boolean) => void, rectProps: {}}) => {
  return (
    <rect 
      onClick={() => {setIsAlive(!isAlive)}} 
      {...rectProps}
      fill={isAlive ? "red" : "white"}
    />
  );
};

export default Cell;
