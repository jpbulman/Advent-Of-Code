import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day4.txt"));

let lines = file.toString().split("\n\n");

// pid:341708492 hgt:190cm byr:1988 hcl:#888785 ecl:hzl iyr:2015 eyr:2029 true
// const fields = [, "iyr", "eyr", , , , ];
const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

// let numValid = 0;
// for (let i = 0; i < lines.length; i++) {
//   const currpassport = lines[i];
//   let validPassport = true;
//   for (const field of fields) {
//     if (!currpassport.includes(field)) {
//       validPassport = false;
//     }
//   }

//   if (validPassport) {
//     numValid++;
//   }
// }

// console.log(lines.length);

let numValid = 0;
L: for (let i = 0; i < lines.length; i++) {
  let currpassport = lines[i];
  let validPassport = true;
  for (const field of fields) {
    if (!currpassport.includes(field)) {
      validPassport = false;
    }
  }

  // pid:720571739 cid:304 byr:1951 hgt:191cm eyr:2025 hcl:#341e13 iyr:2011 true
  if (!validPassport) {
    continue;
  }

  currpassport = currpassport.replace(/(\r\n|\n|\r)/gm, " ");
  const passportFields = currpassport.split(" ");
  for (const pField of passportFields) {
    const colonSep = pField.split(":");
    const currFieldName = colonSep[0];
    const currFieldValue = colonSep[1];

    switch (currFieldName) {
      case "byr":
        if (
          parseInt(currFieldValue) < 1920 ||
          parseInt(currFieldValue) > 2002
        ) {
          validPassport = false;
          //   console.log(currFieldValue);
          continue L;
        }
        break;
      case "iyr":
        if (
          parseInt(currFieldValue) < 2010 ||
          parseInt(currFieldValue) > 2020
        ) {
          validPassport = false;
          //   console.log(currFieldValue);
          continue L;
        }
        break;
      case "eyr":
        if (
          parseInt(currFieldValue) < 2020 ||
          parseInt(currFieldValue) > 2030
        ) {
          validPassport = false;
          console.log(currFieldValue);
          continue L;
        }
        break;
      case "hgt":
        validPassport = validInCm(currFieldValue);
        if (!validPassport) {
          //   console.log(currFieldValue);
          continue L;
        }
        break;
      case "hcl":
        if (
          currFieldValue[0] != "#" ||
          currFieldValue.length != 7 ||
          !/^#[0-9a-f]{6}$/i.test(currFieldValue)
        ) {
          validPassport = false;
          continue L;
          //   console.log(currFieldValue, /^#[0-9A-F]{6}$/i.test(currFieldValue));
        }
        break;
      case "ecl":
        validPassport = validEye(currFieldValue);
        if (!validPassport) {
          continue L;
          //   console.log(currFieldValue);
        }
        break;
      case "pid":
        if (currFieldValue.length != 9 || isNaN(currFieldValue)) {
          validPassport = false;
          continue L;
          //   console.log(currFieldValue);
        }
        break;
    }
  }
  //   console.log(currpassport, validPassport);
  //   console.log();
  if (validPassport) {
    numValid++;
  }
}

function validInCm(currFieldValue) {
  //   const subFields = currFieldValue.;
  const num = currFieldValue.substring(
    0,
    isNaN(parseInt(currFieldValue[2])) ? 2 : 3
  );
  const inOrCm = currFieldValue.substring(
    isNaN(parseInt(currFieldValue[2])) ? 2 : 3,
    currFieldValue.length
  );
  const isInOrCm = inOrCm == "cm" || inOrCm == "in";
  if (isNaN(num) || !isInOrCm) return false;
  if (inOrCm == "cm") {
    return parseInt(num) >= 150 && parseInt(num) <= 193;
  } else {
    return parseInt(num) >= 59 && parseInt(num) <= 76;
  }
}

function validEye(val) {
  const eyeVals = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  return eyeVals.includes(val);
}

console.log(numValid);

// let currpassport = "";
// for (let j = 0; j < lines.length; j++) {
//   const currLine = lines[j];
//   console.log(currLine);
//   if (!currLine == "\n") {
//     currpassport += currLine;
//     continue;
//   } else {
//     let validPassport = true;
//     for (const field of fields) {
//       if (!currpassport.includes(field)) {
//         validPassport = false;
//       }
//     }

//     if (validPassport) {
//       numValid++;
//     }
//     currpassport = "";
//   }
// }

// console.log(numValid);
// console.log(lines.length);
