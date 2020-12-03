/*
 * PART ONE
 */

// var fs = require("fs");

// const path = require("path");
// const file = fs.readFileSync(path.resolve(__dirname, "./day3.txt"));

// const lines = file.toString().split("\n");

// let treesHit = 0;
// lines.forEach((line, idx) => {
//   let longerLine = line;
//   for (let i = 0; i < 100; i++) {
//     longerLine += line;
//   }
//   if (idx % 3 != 0) {
//     const currLetter = longerLine[idx * 1];
//     if (currLetter == "#") {
//       treesHit++;
//     }
//   }
// });

// // 55 250 54 55 29
// // 55 * 250 * 54 * 55 * 29
// console.log(treesHit);

/*
 * PART TWO
 */

var fs = require("fs");

const path = require("path");
const file = fs.readFileSync(path.resolve(__dirname, "./day3.txt"));

let lines = file.toString().split("\n");

const deltaxs = [1, 3, 5, 7, 1];
const deltays = [1, 1, 1, 1, 2];

lines = lines.map((line) => {
  let longerLine = line;
  for (let i = 0; i < 100; i++) {
    longerLine += line;
  }
  return longerLine;
});

let prod = 1;
for (let i = 0; i < deltays.length; i++) {
  const deltax = deltaxs[i];
  const deltay = deltays[i];

  const depth = lines.length;
  let x = (y = treesHit = 0);
  while (y < depth - 1) {
    x += deltax;
    y += deltay;

    console.log(lines[y].length, y, x);
    if (lines[y][x] == "#") {
      treesHit++;
    }
  }

  prod *= treesHit;
}

// Can help for debugging
function replaceChar(origString, replaceChar, index) {
  let firstPart = origString.substr(0, index);
  let lastPart = origString.substr(index + 1);

  let newString = firstPart + replaceChar + lastPart;
  return newString;
}

console.log(prod);
//1592662500
