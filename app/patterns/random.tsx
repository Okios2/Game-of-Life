import createArray from "../utilities/array";

const rows = 50;
const cols = 50;

const randomPattern = () => {
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
