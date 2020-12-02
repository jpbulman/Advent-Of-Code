/*
 * PART ONE:
 */
var fs = require("fs");

const path = require("path");
const file = fs.readFileSync(path.resolve(__dirname, "./day2.txt"));

const lines = file.toString().split("\n");
let count = 0;
lines.forEach((line) => {
  const parts = line.split(":");
  const firstHalf = parts[0].split(" ");
  const numbers = firstHalf[0].split("-");

  const firstNumber = parseInt(numbers[0]);
  const secondNumber = parseInt(numbers[1]);
  const letter = firstHalf[1];
  const password = parts[1];

  let countInPwd = 0;
  for (let i = 0; i < password.length; i++) {
    const currLet = password[i];
    if (currLet == letter) {
      countInPwd++;
    }
  }

  if (countInPwd >= firstNumber && countInPwd <= secondNumber) {
    count++;
  }
});

console.log(count);

/*
 * PART TWO:
 */

count = 0;
lines.forEach((line) => {
  const parts = line.split(":");
  const firstHalf = parts[0].split(" ");
  const numbers = firstHalf[0].split("-");

  const firstNumber = parseInt(numbers[0]);
  const secondNumber = parseInt(numbers[1]);
  const letter = firstHalf[1];
  const password = parts[1];

  if (
    (password[firstNumber] === letter) ^
    (password[secondNumber] === letter)
  ) {
    count++;
  }
});

console.log(count);
