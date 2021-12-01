import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day9.txt"));

const part1 = () => {
  let lines = file.toString().split("\n");

  for (let i = 25; i < lines.length; i++) {
    const currLine = parseInt(lines[i]);
    if (!addsToNumber(currLine, i)) {
      console.log(currLine, i);
      return;
    }
  }
};

const addsToNumber = (goal, idx) => {
  let lines = file.toString().split("\n");
  for (let i = idx - 25; i < lines.length; i++) {
    const currNum = parseInt(lines[i]);
    for (let j = idx - 25; j < lines.length; j++) {
      const adjNum = parseInt(lines[j]);
      if (currNum === adjNum) {
        continue;
      } else if (adjNum + currNum == goal) return true;
    }
  }

  return false;
};

const part2 = () => {
  let lines = file.toString().split("\n");
  for (let i = 0; i < lines.length; i++) {
    const currNum = parseInt(lines[i]);
    let iAcc = currNum;
    let iSet = new Set();
    iSet.add(currNum);
    for (let j = i + 1; j < lines.length; j++) {
      const currJ = parseInt(lines[j]);
      iAcc += currJ;
      if (iAcc == 1124361034) {
        iSet.add(currJ);
        console.log([...iSet.values()].sort());
        iSet = new Set();
        iAcc = 0;
      } else if (iAcc > 1124361034) {
        break;
      } else {
        iSet.add(currJ);
      }
    }
  }
};

part1();
part2();
