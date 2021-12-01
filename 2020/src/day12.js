import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day12.txt"));

const part1 = () => {
  let lines = file.toString().split("\n");

  let horz = 0;
  let vert = 0;
  let direction = 1;
  for (let i = 0; i < lines.length; i++) {
    const currLine = lines[i];
    const currLetter = currLine[0];
    const currNumber = parseInt(currLine.substring(1, currLine.length));
    if (currLetter == "N") {
      vert += currNumber;
    } else if (currLetter == "S") {
      vert -= currNumber;
    } else if (currLetter == "E") {
      horz += currNumber;
    } else if (currLetter == "W") {
      horz -= currNumber;
    } else if (currLetter == "L") {
      direction -= currNumber / 90;
      if (direction < 0) {
        direction = 4 + direction;
      }
    } else if (currLetter == "R") {
      direction += currNumber / 90;
      if (direction > 3) {
        direction = direction % 4;
      }
    } else if (currLetter == "F") {
      if (direction == 0) {
        vert += currNumber;
      } else if (direction == 1) {
        horz += currNumber;
      } else if (direction == 2) {
        vert -= currNumber;
      } else if (direction == 3) {
        horz -= currNumber;
      } else {
        console.log(direction, "$$$$");
      }
    } else {
      console.log(currLetter, "!!!!");
    }
  }

  //   console.log(horz, vert, direction);
};

const part2 = () => {
  let lines = file.toString().split("\n");

  let horz = 0;
  let vert = 0;
  let wpHorz = 10;
  let wpVert = 1;
  for (let i = 0; i < lines.length; i++) {
    const currLine = lines[i];
    const currLetter = currLine[0];
    const currNumber = parseInt(currLine.substring(1, currLine.length));
    if (currLetter == "N") {
      wpVert += currNumber;
    } else if (currLetter == "S") {
      wpVert -= currNumber;
    } else if (currLetter == "E") {
      wpHorz += currNumber;
    } else if (currLetter == "W") {
      wpHorz -= currNumber;
    } else if (currLetter == "L") {
      for (let t = 0; t < currNumber / 90; t++) {
        const tempWpHorz = wpHorz;
        wpHorz = -wpVert;
        wpVert = tempWpHorz;
      }
    } else if (currLetter == "R") {
      for (let t = 0; t < currNumber / 90; t++) {
        const tempWpHorz = wpHorz;
        wpHorz = wpVert;
        wpVert = -tempWpHorz;
      }
    } else if (currLetter == "F") {
      horz += wpHorz * currNumber;
      vert += wpVert * currNumber;
      //   wpHorz += horz;
      //   wpVert += vert;
    } else {
      console.log(currLetter, "!!!!");
    }
    console.log(horz, vert, wpHorz + horz, wpVert + vert, currLine);
  }

  console.log(Math.abs(horz) + Math.abs(vert));
};

part1();
part2();
