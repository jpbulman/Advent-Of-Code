import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day8.txt"));

let lines = file.toString().split("\n");
// let linesSeen = new Set();
// let acc = 0;
// for (let i = 0; i < lines.length; i++) {
//   const currLine = lines[i].split(" ");
//   const instr = currLine[0];
//   const num = parseInt(currLine[1]);

//   if (linesSeen.has(i)) {
//     console.log(acc);
//     break;
//   }

//   if (instr == "nop") {
//     linesSeen.add(i);
//     continue;
//   } else if (instr == "jmp") {
//     i += num - 1;
//   } else if (instr == "acc") {
//     acc += num;
//   } else {
//     console.log(instr, "!!!!!");
//   }

//   linesSeen.add(i);
// }

/*
 * PART TWO
 */

function lineChangeEndsProgram(lineNum, inst) {
  let linesSeen = new Set();
  let acc = 0;
  for (let i = 0; i < lines.length; i++) {
    const currLine = i == lineNum ? inst.split(" ") : lines[i].split(" ");
    const instr = currLine[0];
    const num = parseInt(currLine[1]);

    if (linesSeen.has(i)) {
      // console.log(acc);
      return false;
    }

    if (instr == "nop") {
      linesSeen.add(i);
      continue;
    } else if (instr == "jmp") {
      linesSeen.add(i);
      i += num - 1;
      continue;
    } else if (instr == "acc") {
      acc += num;
    } else {
      console.log(instr, "!!!!!");
    }

    linesSeen.add(i);
  }

  return acc;
}

for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i].split(" ");
  const instr = currLine[0];
  const num = parseInt(currLine[1]);

  if (instr == "jmp") {
    const val = lineChangeEndsProgram(i, "nop " + num);
    if (val !== false) console.log(val);
  } else if (instr == "nop") {
    const val = lineChangeEndsProgram(i, "jmp " + num);
    if (val !== false) console.log(val);
  }
}
