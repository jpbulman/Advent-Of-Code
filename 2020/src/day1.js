/*
 * PART ONE
 */
var fs = require("fs");

const path = require("path");
const file = fs.readFileSync(path.resolve(__dirname, "./day1.txt"));

const lines = file.toString().split("\n");

const listOfNumbers = new Set();
lines.forEach((line) => {
  listOfNumbers.add(parseInt(line));
});

lines.forEach((line) => {
  const currNum = parseInt(line);
  const recipr = 2020 - currNum;

  if (listOfNumbers.has(recipr)) {
    console.log(currNum * recipr);
  }
});

/*
 * PART TWO
 */
lines.forEach((line) => {
  const i = parseInt(line);
  lines.forEach((linej) => {
    const j = parseInt(linej);
    lines.forEach((linek) => {
      const k = parseInt(linek);

      if (i + j + k == 2020) {
        console.log(i * j * k);
      }
    });
  });
});
// const fs = require("fs");
// const readline = require("readline");

// const path = require("path");
// // const file = fs.readFileSync(path.resolve(__dirname, "./one.txt"));

// const readInterface = readline.createInterface({
//   input: fs.createReadStream(path.resolve(__dirname, "./one.txt")),
//   output: process.stdout,
//   console: false,
// });

// readInterface.on("\n", (line) => {
//   console.log(line);
// });
