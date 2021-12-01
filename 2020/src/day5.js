import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day5.txt"));

let lines = file.toString().split("\n");

let currHighest = 0;
let rowColMap = {};
for (let i = 0; i < lines.length; i++) {
  // for (let i = 0; i < 1; i++) {
  const currLine = lines[i];
  const rowStr = currLine.substring(0, 7);
  //   const rowStr = "FBFBBFF";
  const colStr = currLine.substring(7, 10);
  //   const colStr = "RLR";

  let start = 0,
    end = 127;

  let charCount = 0;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    const currRowChar = rowStr[charCount];

    if (currRowChar == "B") start = mid + 1;
    else end = mid - 1;

    charCount++;
  }

  let rowVal = start;

  start = 0;
  end = 7;
  charCount = 0;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    const currColChar = colStr[charCount];

    if (currColChar == "R") start = mid + 1;
    else end = mid - 1;

    charCount++;
  }
  let colVal = start;

  //   console.log(currLine, rowVal, colVal);
  const currSeatId = rowVal * 8 + colVal;
  if (!rowColMap[rowVal]) {
    rowColMap[rowVal] = [colVal];
  } else {
    rowColMap[rowVal] = [...rowColMap[rowVal], colVal];
  }
  if (currSeatId > currHighest) currHighest = currSeatId;
}

for (const key of Object.keys(rowColMap)) {
  const currCols = rowColMap[key].sort();
  const vals = [0, 1, 2, 3, 4, 5, 6, 7];
  if (!arrayEquals(currCols, vals)) {
    console.log(currCols, key);
  }
}
// console.log(currHighest);

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}
