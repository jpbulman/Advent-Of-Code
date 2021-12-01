import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day17.txt"));

const cycle = (stateMap) => {
  const nextMap = new Map(stateMap);

  stateMap.forEach((layerArr, z) => {
    let newLayer = [];

    layerArr.forEach((currLine, y) => {
      let x = 0;
      let newLine = "";
      for (const char of currLine) {
        let res = -1;
        const activeNeighbors = neighborsActive(stateMap, [x, y, z]);
        if (char == "#" && (activeNeighbors == 2 || activeNeighbors == 3)) {
          res = "#";
        } else if (char == "." && activeNeighbors === 3) {
          res = "#";
        } else {
          res = ".";
        }

        newLine += res;
        x++;
      }
      newLayer.push(newLine);
    });

    layerArr.forEach((line, y) => {
      let x = 0;
      for (const char of line) {
        for (let deltz = -1; deltz <= 1; deltz++) {
          for (let delty = -1; delty <= 1; delty++) {
            for (let deltx = -1; deltx <= 1; deltx++) {
              if (
                !isInsideStateMap([x + deltx, y + delty, z + deltz], stateMap)
              ) {
                const activeNeighbors = neighborsActive(stateMap, [x, y, z]);
                if (activeNeighbors == 2 || activeNeighbors == 3) {
                  if (deltz == 0) {
                  }
                } else {
                }
              }
            }
          }
        }
        x++;
      }
    });

    nextMap.set(z, newLayer);
  });

  return nextMap;
};

const isOuterPiece = (coords, stateMap) => {
  const len = stateMap.get();
};

const isInsideStateMap = (coords, stateMap) => {
  stateMap.forEach((block, z) => {
    block.forEach((line, y) => {
      if (
        coords[2] == z &&
        coords[1] == y &&
        coords[0] > 0 &&
        coords[0] < line.length
      )
        return true;
    });
  });

  return false;
};

const neighborsActive = (stateMap, coords) => {
  let numActive = 0;
  for (let deltz = -1; deltz <= 1; deltz++) {
    for (let delty = -1; delty <= 1; delty++) {
      for (let deltx = -1; deltx <= 1; deltx++) {
        const z = coords[2 + deltz];
        if (stateMap.has(z)) {
          const y = coords[1] + delty;
          const currBlock = stateMap.get(z);
          if (y > 0 && y < currBlock.length) {
            const x = coords[0] + deltx;
            const currNeighbor = stateMap.get(z)[y][x];
            if (currNeighbor == "#") {
              numActive++;
            }
          }
        }
      }
    }
  }

  return numActive;
};

const part1 = () => {
  const layerMap = new Map();

  let currState = layerMap.set(0, file.toString().split("\n"));
  for (let i = 0; i < 6; i++) {
    console.log(currState, i);
    currState = cycle(currState);
  }
};

const part2 = () => {
  const lines = file.toString().split("\n");
  // .forEach((line, idx) => {});
};

part1();
// part2();
