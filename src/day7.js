import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day7.txt"));

let lines = file.toString().split("\n");
const bagMap = new Map();
for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i].split("contain");
  //   const currLine = "wavy brown bags contain no other bags.".split("contain");
  const firstHalf = currLine[0].split(" ");
  const secondHalf = currLine[1];
  const currColor = firstHalf[0] + firstHalf[1];

  const containedBags = secondHalf.split(",");
  if (containedBags.length != 1) {
    let containingColors = [];
    for (const j of containedBags) {
      const currBag = j.split(" ");
      const bagNumber = currBag[1];
      const bagColor = currBag[2] + currBag[3];
      containingColors.push(bagNumber + " " + bagColor);
    }
    bagMap.set(currColor, containingColors);
  } else {
    const sHalf = secondHalf.split(" ");
    const bagNumber = sHalf[1];
    // console.log(sHalf, bagNumber, currColor);
    if (bagNumber == "no") {
      bagMap.set(currColor, ["NOCOLOR"]);
    } else {
      // console.log(bagMap);
      const bagColor = sHalf[2] + sHalf[3];
      bagMap.set(currColor, [bagNumber + " " + bagColor]);
    }
  }
}

function depthCount(bag) {
  if (bag == "NOCOLOR") return 0;
  const bagSplit = bag.split(" ");
  const bagNumber = parseInt(bagSplit[0]);
  const bagColor = bagSplit[1];

  let count = 0;
  for (const color of bagMap.get(bagColor)) {
    count += depthCount(color);
  }

  return bagNumber + bagNumber * count;
}

let ct = 0;
for (const color of bagMap.get("shinygold")) {
  ct += depthCount(color);
}
console.log(ct);

// **
// PART ONE:
// Comment out the below to run the top or vice versa
// **

lines = file.toString().split("\n");
const bagMap = new Map();
for (let i = 0; i < lines.length; i++) {
  const currLine = lines[i].split("contain");
  //   const currLine = "wavy brown bags contain no other bags.".split("contain");
  const firstHalf = currLine[0].split(" ");
  const secondHalf = currLine[1];
  const currColor = firstHalf[0] + firstHalf[1];

  const containedBags = secondHalf.split(",");
  if (containedBags.length != 1) {
    let containingColors = [];
    for (const j of containedBags) {
      const currBag = j.split(" ");
      const bagNumber = currBag[1];
      const bagColor = currBag[2] + currBag[3];
      containingColors.push(bagColor);
    }
    bagMap.set(currColor, containingColors);
  } else {
    const sHalf = secondHalf.split(" ");
    const bagNumber = sHalf[1];
    // console.log(sHalf, bagNumber, currColor);
    if (bagNumber == "no") {
      bagMap.set(currColor, ["NOCOLOR"]);
    } else {
      // console.log(bagMap);
      const bagColor = sHalf[2] + sHalf[3];
      bagMap.set(currColor, [bagColor]);
    }
  }
}

function bagContainsValue(bag, val) {
  if (bag == "NOCOLOR") return false;
  for (const otherBag of bagMap.get(bag)) {
    if (otherBag == val) {
      return true;
    } else {
      if (bagContainsValue(otherBag, val)) return true;
    }
  }
  return false;
}

let count = 0;
for (let [key, value] of bagMap) {
  if (bagContainsValue(key, "shinygold")) {
    count++;
  }
}

console.log(count);
