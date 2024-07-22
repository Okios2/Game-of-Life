import createArray from "../utilities/array";

const tumblerPattern = createArray(6, 7);

tumblerPattern[0][1] = true;
tumblerPattern[0][2] = true;
tumblerPattern[1][1] = true;
tumblerPattern[1][2] = true;
tumblerPattern[2][2] = true;
tumblerPattern[3][0] = true;
tumblerPattern[3][2] = true;
tumblerPattern[4][0] = true;
tumblerPattern[4][2] = true;
tumblerPattern[5][0] = true;
tumblerPattern[5][1] = true;

for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 3; j++) {
      tumblerPattern[i][6 - j] = tumblerPattern[i][j];
  }
}

export default tumblerPattern;
