import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day11.txt"));

/*
 * Disclaimer: What you are about to read is vile and inefficient copy paste garbage.
 * This is mostly because AoC is for speed and not for 'good' code.
 * Although this is simply an excuse, I choose to believe that it's the reason that this is so bad.
 * Yesterday, I had a really nice one line solution for a harder problem, so I guess this absolute hot mess makes my code karma even.
 * It works, was it worth it? Maybe, but now I have to live knowing I wrote this monster.
 */

const part1 = () => {
  let lines = file.toString().split("\n");

  let currState = lines;
  while (true) {
    const nextState = emptySeats(currState);
    nextState.forEach((row) => console.log(row));

    console.log("  ");

    const fourState = fourSeats([...nextState]);
    fourState.forEach((row) => console.log(row));

    console.log(" !!!!! ");

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
        let acc = 0;

        if (i == 0 && j == 8) console.log(acc);

        for (let lefti = j - 1; lefti >= 0; lefti--) {
          const curr = currRow[lefti];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        for (let righti = j + 1; righti < currRow.length; righti++) {
          const curr = currRow[righti];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        for (let upi = i - 1; upi >= 0; upi--) {
          const curr = rows[upi][j];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        for (let downi = i + 1; downi < rows.length; downi++) {
          const curr = rows[downi][j];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        let upleftx, uplefty;
        for (
          upleftx = j - 1, uplefty = i - 1;
          upleftx >= 0 && uplefty >= 0;
          upleftx--, uplefty--
        ) {
          const curr = rows[uplefty][upleftx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        let uprightx, uprighty;
        for (
          uprightx = j + 1, uprighty = i - 1;
          uprightx < currRow.length && uprighty >= 0;
          uprightx++, uprighty--
        ) {
          const curr = rows[uprighty][uprightx];
          if (i == 0 && j == 8) console.log(uprighty, uprightx, curr);
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        let downleftx, downlefty;
        for (
          downleftx = j - 1, downlefty = i + 1;
          downleftx >= 0 && downlefty < rows.length;
          downleftx--, downlefty++
        ) {
          const curr = rows[downlefty][downleftx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        let downrightx, downrighty;
        for (
          downrightx = j + 1, downrighty = i + 1;
          downrightx < currRow.length && downrighty < rows.length;
          downrightx++, downrighty++
        ) {
          const curr = rows[downrighty][downrightx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);
        if (acc >= 5) {
          newSeats[i] = setCharAt(newSeats[i], j, "L");
        }
      }
    }
  }

  return newSeats;
};

// const dirCheck = (j, row) => {
//     for(let lefti = j -1; lefti >= 0; lefti--){
//         const curr = row[lefti]
//         if(curr == "#"){
//             acc++;
//             break;
//         } else if(curr == "L"){
//             break;
//         }
//     }
// }

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
        let acc = 0;

        for (let lefti = j - 1; lefti >= 0; lefti--) {
          const curr = currRow[lefti];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        for (let righti = j + 1; righti < currRow.length; righti++) {
          const curr = currRow[righti];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        for (let upi = i - 1; upi >= 0; upi--) {
          const curr = rows[upi][j];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        for (let downi = i + 1; downi < rows.length; downi++) {
          const curr = rows[downi][j];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        let upleftx, uplefty;
        for (
          upleftx = j - 1, uplefty = i - 1;
          upleftx >= 0 && uplefty >= 0;
          upleftx--, uplefty--
        ) {
          const curr = rows[uplefty][upleftx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        let uprightx, uprighty;
        for (
          uprightx = j + 1, uprighty = i - 1;
          uprightx < currRow.length && uprighty >= 0;
          uprightx++, uprighty--
        ) {
          const curr = rows[uprighty][uprightx];
          if (i == 0 && j == 8) console.log(uprighty, uprightx, curr);
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        if (i == 0 && j == 8) console.log(acc);

        let downleftx, downlefty;
        for (
          downleftx = j - 1, downlefty = i + 1;
          downleftx >= 0 && downlefty < rows.length;
          downleftx--, downlefty++
        ) {
          const curr = rows[downlefty][downleftx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }
        if (i == 0 && j == 8) console.log(acc);

        let downrightx, downrighty;
        for (
          downrightx = j + 1, downrighty = i + 1;
          downrightx < currRow.length && downrighty < rows.length;
          downrightx++, downrighty++
        ) {
          const curr = rows[downrighty][downrightx];
          if (curr == "#") {
            acc++;
            break;
          } else if (curr == "L") {
            break;
          }
        }

        // console.log(currChar);
        // process.stdout.write(j + currChar + i);
        if (acc == 0) {
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
