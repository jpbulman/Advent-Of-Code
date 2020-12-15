import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day15.txt"));

const part1 = () => {
  let lines = file
    .toString()
    .split("\n")
    .forEach((line, idx) => {});

  const seenNums = new Map();
  const nums = [20, 0, 1, 11, 6, 3];
  // const nums = [1, 3, 2];
  // const nums = [0, 3, 6];
  // const nums = [3, 1, 2];
  let lastNumberSpoken = nums[0];
  for (let i = 0; i < 30000000; i++) {
    if (i % 1000000 == 0) console.log(i);
    if (i < nums.length) {
      seenNums.set(nums[i], [i]);
      lastNumberSpoken = nums[i];
    } else {
      if (seenNums.get(lastNumberSpoken).length == 1) {
        if (seenNums.has(0)) {
          seenNums.set(0, seenNums.get(0).concat(i));
        } else {
          seenNums.set(0, [i]);
        }
        lastNumberSpoken = 0;
      } else {
        const newIdx =
          i -
          1 -
          seenNums.get(lastNumberSpoken)[
            seenNums.get(lastNumberSpoken).length - 2
          ];
        if (seenNums.has(newIdx)) {
          seenNums.set(newIdx, seenNums.get(newIdx).concat(i));
        } else {
          seenNums.set(newIdx, [i]);
        }
        lastNumberSpoken = newIdx;
      }
    }
    // console.log(lastNumberSpoken);
  }
  console.log(lastNumberSpoken);
  // console.log(seenNums);

  //   for (let i = 0; i < lines.length; i++) {}
};

const part2 = () => {
  const seenNums = new Map();
  const nums = [20, 0, 1, 11, 6, 3];
  // const nums = [1, 3, 2];
  // const nums = [0, 3, 6];
  // const nums = [3, 1, 2];
  let lastNumberSpoken = nums[0];
  for (let i = 0; i < 30000000; i++) {
    if (i % 1000000 == 0) console.log(i);
    if (i < nums.length) {
      seenNums.set(nums[i], [i]);
      lastNumberSpoken = nums[i];
    } else {
      if (seenNums.get(lastNumberSpoken).length == 1) {
        if (seenNums.has(0)) {
          const mostrecentinstance = seenNums.get(0)[
            seenNums.get(0).length - 1
          ];
          seenNums.set(0, [mostrecentinstance, i]);
        } else {
          seenNums.set(0, [i]);
        }
        lastNumberSpoken = 0;
      } else {
        const newIdx =
          i -
          1 -
          seenNums.get(lastNumberSpoken)[
            seenNums.get(lastNumberSpoken).length - 2
          ];
        if (seenNums.has(newIdx)) {
          const mostrecentinstance = seenNums.get(newIdx)[
            seenNums.get(newIdx).length - 1
          ];
          seenNums.set(newIdx, [mostrecentinstance, i]);
        } else {
          seenNums.set(newIdx, [i]);
        }
        lastNumberSpoken = newIdx;
      }
    }
    // console.log(lastNumberSpoken);
  }
  console.log(lastNumberSpoken);
};

// part1();
part2();
