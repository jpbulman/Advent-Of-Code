import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day6.txt"));

let lines = file.toString().split("\n\n");
let sum = 0;
for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i];

  const lettersInLine = new Set();
  for (let j = 0; j < currLine.length; j++) {
    const currChar = currLine[j];
    if (currChar != "\n") lettersInLine.add(currChar);
  }
  sum += lettersInLine.size;
}
console.log(sum);

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const file = readFileSync(resolve(__dirname, "./day6.txt"));

// let lines = file.toString().split("\n\n");
sum = 0;
for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i];

  const numPeople = currLine.split("\n").length;

  const lettersInLine = {};
  for (let j = 0; j < currLine.length; j++) {
    const currChar = currLine[j];
    if (currChar != "\n") {
      if (currChar in lettersInLine) {
        lettersInLine[currChar] += 1;
      } else {
        lettersInLine[currChar] = 1;
      }
    }
  }
  //   console.log(lettersInLine);

  for (const key in lettersInLine) {
    if (lettersInLine[key] == numPeople) sum++;
  }
  //   sum += lettersInLine.size;
}
console.log(sum);
