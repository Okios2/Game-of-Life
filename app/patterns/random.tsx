const randomPattern = (rows: number, cols: number) => {
    return (
        Array.from(
            {length:rows},
            () => Array.from(
                {length: cols}, 
                () => Math.random() < 0.5,
            ),
        )
    )
};

export default randomPattern;
