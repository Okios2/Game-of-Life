const QueenBeePattern = () => {
    const grid = (
        Array.from(
            {length:7},
            () => Array.from(
                {length: 4}, 
                () => {
                    return false;
                },
            ),
        )
    )
    grid[0][0] = true;
    grid[0][1] = true;
    grid[1][2] = true;
    grid[2][3] = true;
    grid[3][3] = true;
    grid[4][3] = true;
    grid[5][2] = true;
    grid[6][1] = true;
    grid[6][0] = true;

    return grid;
}

export default QueenBeePattern;
