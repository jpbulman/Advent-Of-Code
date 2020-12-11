import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day11.txt"));

const part1 = () => {
  let lines = file.toString().split("\n");

  let currState = lines;
  while (true) {
    const nextState = emptySeats(currState);
    // nextState.forEach((row) => console.log(row));

    const fourState = fourSeats([...nextState]);
    // fourState.forEach((row) => console.log(row));

    if (equal(currState, fourState)) {
      console.log(countSeats(currState));
      break;
    } else {
      currState = [...fourState];
    }
  }
};

function equal(array1, array2) {
  if (!Array.isArray(array1) && !Array.isArray(array2)) {
    return array1 === array2;
  }

  if (array1.length !== array2.length) {
    return false;
  }

  for (var i = 0, len = array1.length; i < len; i++) {
    if (!equal(array1[i], array2[i])) {
      return false;
    }
  }

  return true;
}

const fourSeats = (rows) => {
  const newSeats = [...rows];

  for (let i = 0; i < rows.length; i++) {
    const currRow = rows[i];
    for (let j = 0; j < currRow.length; j++) {
      const currChar = currRow[j];
      if (currChar == "#") {
        const left = currRow[j - 1];
        const right = currRow[j + 1];
        const up = i > 0 ? rows[i - 1][j] : "@";
        const down = i < rows.length - 1 ? rows[i + 1][j] : "@";

        const upLeft = i > 0 ? rows[i - 1][j - 1] : "@";
        const upRight = i > 0 ? rows[i - 1][j + 1] : "@";
        const downLeft = i < rows.length - 1 ? rows[i + 1][j - 1] : "@";
        const downRight = i < rows.length - 1 ? rows[i + 1][j + 1] : "@";

        const allSeats = [
          left,
          right,
          up,
          down,
          upLeft,
          upRight,
          downLeft,
          downRight,
        ];
        let takenCount = 0;
        for (const seat of allSeats) {
          if (seat == "#") {
            takenCount++;
          }
        }

        if (takenCount >= 4) {
          newSeats[i] = setCharAt(newSeats[i], j, "L");
        }
      }
    }
  }

  return newSeats;
};

const countSeats = (rows) => {
  let acc = 0;
  rows.forEach((row) => {
    for (let i = 0; i < row.length; i++) {
      if (row[i] == "#") acc++;
    }
  });
  return acc;
};

const emptySeats = (rows) => {
  const newSeats = [...rows];

  for (let i = 0; i < rows.length; i++) {
    const currRow = rows[i];
    for (let j = 0; j < currRow.length; j++) {
      const currChar = currRow[j];
      if (currChar == "L") {
        const left = currRow[j - 1];
        const right = currRow[j + 1];
        const up = i > 0 ? rows[i - 1][j] : "@";
        const down = i < rows.length - 1 ? rows[i + 1][j] : "@";

        const upLeft = i > 0 ? rows[i - 1][j - 1] : "@";
        const upRight = i > 0 ? rows[i - 1][j + 1] : "@";
        const downLeft = i < rows.length - 1 ? rows[i + 1][j - 1] : "@";
        const downRight = i < rows.length - 1 ? rows[i + 1][j + 1] : "@";

        if (
          left != "#" &&
          right != "#" &&
          up != "#" &&
          down != "#" &&
          upLeft != "#" &&
          upRight != "#" &&
          downLeft != "#" &&
          downRight != "#"
        ) {
          newSeats[i] = setCharAt(newSeats[i], j, "#");
        }
      }
    }
  }

  return newSeats;
};

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

const part2 = () => {
  let lines = file.toString().split("\n");

  let acc = 0;
  for (let i = 0; i < lines.length; i++) {
    const currLine = lines[i];
  }
};

part1();
part2();
