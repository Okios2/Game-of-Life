import createArray from "../utilities/array";

const queenBeePattern = createArray(7, 4);

queenBeePattern[0][0] = true;
queenBeePattern[0][1] = true;
queenBeePattern[1][2] = true;
queenBeePattern[2][3] = true;
queenBeePattern[3][3] = true;
queenBeePattern[4][3] = true;
queenBeePattern[5][2] = true;
queenBeePattern[6][1] = true;
queenBeePattern[6][0] = true;

export default queenBeePattern;
