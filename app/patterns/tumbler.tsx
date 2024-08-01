import createArray from "../utilities/array";

const tumblerPattern = createArray(11, 11);

tumblerPattern[2][3] = true;
tumblerPattern[2][4] = true;
tumblerPattern[3][3] = true;
tumblerPattern[3][4] = true;
tumblerPattern[4][4] = true;
tumblerPattern[5][2] = true;
tumblerPattern[5][4] = true;
tumblerPattern[6][2] = true;
tumblerPattern[6][4] = true;
tumblerPattern[7][2] = true;
tumblerPattern[7][3] = true;

for (let i = 0; i < 6; i++) {
	for (let j = 0; j < 3; j++) {
		tumblerPattern[2 + i][8 - j] = tumblerPattern[2 + i][2 + j];
	}
}

export default tumblerPattern;
