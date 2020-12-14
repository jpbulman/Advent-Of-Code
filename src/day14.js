import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day14.txt"));

const part1 = () => {
  let lines = file
    .toString()
    .split("\n")
    .forEach((line, idx) => {});

  //   for (let i = 0; i < lines.length; i++) {}
};

const part2 = () => {
  let lines = file
    .toString()
    .split("\n")
    .forEach((line, idx) => {});
};

const i = 110001010111111001100000000011101101;
console.log(i);

part1();
part2();
