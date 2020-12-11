import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// const file = readFileSync(resolve(__dirname, "./day10.txt"));
const file = readFileSync(resolve(__dirname, "./day10.txt"));

const part1 = () => {
  let lines = file.toString().split("\n");

  lines = lines.map((p) => parseInt(p));
  lines = lines.sort(function (a, b) {
    return a - b;
  });

  //   const joltAdapters = new Set(lines);
  let oneCounts = 0;
  let threeCounts = 0;
  for (let i = 0; i < lines.length; i++) {
    const currVal = lines[i];

    let diff = i == 0 ? currVal - 0 : currVal - lines[i - 1];

    if (diff == 1) {
      oneCounts++;
    } else if (diff == 3) {
      threeCounts++;
    } else {
      console.log(i, currVal, lines[i - 1], diff);
    }
  }
  threeCounts += 1;
  console.log(oneCounts);
  console.log(threeCounts);
  console.log(oneCounts * threeCounts);
};

// For this part, add 0 to the txt file
const part2 = () => {
  let lines = file.toString().split("\n");
  lines = lines.map((p) => parseInt(p));
  // JS is sometimes stupid as duck
  lines = lines.sort(function (a, b) {
    return a - b;
  });

  const numberOfArrangements = new Map();
  numberOfArrangements.set(157, 1);
  for (let i = lines.length - 1; i >= 0; i--) {
    const currVal = lines[i];
    const closeVals = [currVal + 1, currVal + 2, currVal + 3];

    let localAcc = 0;
    for (const a of closeVals) {
      if (numberOfArrangements.has(a)) {
        const numArr = numberOfArrangements.get(a);
        localAcc += numArr;
      }
    }
    numberOfArrangements.set(currVal, localAcc);
  }

  console.log(numberOfArrangements.get(0));
};

const part2SingleLine = () => {
  let lines = file.toString().split("\n");
  lines = lines.map((p) => parseInt(p));
  // JS is sometimes stupid as duck
  // lines = lines.sort(function (a, b) {
  //   return a - b;
  // });

  const arr = new Map();
  arr.set(Math.max(...lines) + 3, 1);
  const foo = lines
    .sort((a, b) => a - b)
    .reverse()
    .map((c) =>
      arr
        .set(
          c,
          [c + 1, c + 2, c + 3].reduce(
            (na, curr) => (arr.has(curr) ? na + arr.get(curr) : na),
            0
          )
        )
        .get(c)
    )
    .slice(-1)[0];
  console.log(foo);
};

// part1();
part2();
part2SingleLine();

// 157 => 1,
// 154 => 1,
// 151 => 1,
// 150 => 1,
// 149 => 2,
// 148 => 4,
// 147 => 7,
// 144 => 7,
// 141 => 7,
// 140 => 7,
// 139 => 14,
// 138 => 28,
// 135 => 28,
// 132 => 28,
// 131 => 28,
// 130 => 56,
// 129 => 112,
// 128 => 196,
// 125 => 196,
// 124 => 196,
// 123 => 392,
// 120 => 392,
// 119 => 392,
// 118 => 784,
// 117 => 1568,
// 116 => 2744,
// 113 => 2744,
// 112 => 2744,
// 111 => 5488,
