const createArray = (rows: number, cols: number) => {
    return (
        Array.from(
            {length:rows},
            () => Array.from(
              {length: cols}, 
              () => false,
            ),
        )
    )
}

export default createArray;
