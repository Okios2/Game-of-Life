const countAliveNeighbors = (grid: boolean[][], x: number, y: number) => {
	let sum = 0;
	const rows = grid.length;
	const cols = grid[0].length;
	for (let localRow = -1; localRow < 2; localRow++){
		for (let localCol = -1; localCol < 2; localCol++) {    
			if (localRow === 0 && localCol === 0) {continue};
			const row = (x + localRow + rows) % rows;
			const col = (y + localCol + cols) % cols;
			sum += Number(grid[row][col]);
		}
	}

	return sum;
};

export default countAliveNeighbors;
