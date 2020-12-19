import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day16.txt"));

const part1 = () => {
  const lines = file.toString().split("\n");
  // .forEach((line, idx) => {});
  const rules = lines.slice(0, 20);
  const nearbyTickets = lines.slice(25, 270);

  const ranges = new Set();
  rules.forEach((rule) => {
    const parts = rule.split(": ");
    const numparts = parts[1].split(" or ");
    // const firstNums = numparts[0].split("-");
    // const secondNums = numparts[1].split("-");
    // const nums = [
    //   firstNums[0],
    //   firstNums[1],
    //   secondNums[0],
    //   secondNums[1],
    // ].map((e) => parseInt(e));
    ranges.add(numparts[0]);
    ranges.add(numparts[1]);

    // console.log(nums);
  });

  let sum = 0;
  nearbyTickets.forEach((t) => {
    const vals = t.split(",");
    vals.forEach((val) => {
      const valint = parseInt(val);
      let fitARule = false;
      ranges.forEach((r) => {
        const nums = r.split("-");
        const min = parseInt(nums[0]);
        const max = parseInt(nums[1]);
        if (valint >= min && valint <= max) {
          if (valint == 19) {
            console.log(min, max);
            console.log(valint >= min, valint <= max);
          }
          fitARule = true;
        }
      });

      if (!fitARule) {
        // console.log(valint);
        sum += valint;
      }
    });
  });

  console.log(sum);
};

const part2 = () => {
  const lines = file.toString().split("\n");
  // .forEach((line, idx) => {});
  const rules = lines.slice(0, 20);
  //   const rules = lines.slice(0, 3);
  const nearbyTickets = lines.slice(25, 270);
  const myTicket = lines[22].split(",").map((e) => parseInt(e));
  //   const nearbyTickets = lines.slice(8, 11);

  const ranges = new Set();
  rules.forEach((rule) => {
    const parts = rule.split(": ");
    const numparts = parts[1].split(" or ");
    ranges.add(numparts[0]);
    ranges.add(numparts[1]);
  });

  const badIdxs = new Set();
  nearbyTickets.forEach((t, idx) => {
    const vals = t.split(",");
    vals.forEach((val) => {
      const valint = parseInt(val);
      let fitARule = false;
      ranges.forEach((r) => {
        const nums = r.split("-");
        const min = parseInt(nums[0]);
        const max = parseInt(nums[1]);
        if (valint >= min && valint <= max) {
          if (valint == 19) {
            console.log(min, max);
            console.log(valint >= min, valint <= max);
          }
          fitARule = true;
        }
      });

      if (!fitARule) {
        badIdxs.add(idx);
      }
    });
  });
  const goodTickets = nearbyTickets.filter((val, idx) => !badIdxs.has(idx));

  const colToRangeMap = new Map();
  const takenRules = new Set();
  for (let i = 0; i < 20; i++) {
    const currColumn = goodTickets.map((row) => {
      return parseInt(row.split(",")[i]);
    });

    rules.forEach((rule) => {
      const parts = rule.split(": ");
      const numparts = parts[1].split(" or ");
      const firstNums = numparts[0].split("-").map((e) => parseInt(e));
      const secondNums = numparts[1].split("-").map((e) => parseInt(e));

      // Could just be a return of this condition
      const newCol = currColumn.filter((a) => {
        if (
          (a < firstNums[0] || a > firstNums[1]) &&
          (a < secondNums[0] || a > secondNums[1])
        ) {
          return false;
        } else {
          return true;
        }
      });

      if (newCol.length == currColumn.length && !takenRules.has(rule)) {
        if (colToRangeMap.has(i)) {
          colToRangeMap.set(i, colToRangeMap.get(i).concat(rule));
        } else {
          colToRangeMap.set(i, [rule]);
        }
      }
    });

    if (colToRangeMap.get(i).length == 1) {
      console.log(i);
      takenRules.add(colToRangeMap.get(i)[0]);
    }
  }

  for (let i = 0; i < 20; i++) {
    for (let [key, val] of colToRangeMap) {
      if (val.length !== 1) {
        const newer = val.filter((rule) => !takenRules.has(rule));
        if (newer.length == 1) {
          takenRules.add(newer[0]);
        }
        colToRangeMap.set(key, newer);
      }
    }
  }

  let prod = 1;
  for (let [key, val] of colToRangeMap) {
    if (val[0].includes("departure")) {
      console.log(key, val);
      prod *= myTicket[key];
    }
  }

  console.log(prod);
};

part1();
part2();
