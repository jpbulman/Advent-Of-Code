import { readFileSync } from "fs";
import { dirname } from "path";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = readFileSync(resolve(__dirname, "./day13.txt"));

const part1 = () => {
  let lines = file.toString().split("\n");
  const arriveTime = parseInt(lines[0]);
  const busIds = lines[1]
    .split(",")
    .filter((a) => a !== "x")
    .map((a) => parseInt(a));

  let bestBusId = -1;
  let bestDiff = 9999999;
  busIds.forEach((busId, idx) => {
    const currDiff = busId - (arriveTime % busId);
    if (currDiff < bestDiff) {
      bestDiff = currDiff;
      bestBusId = busId;
    }
  });
  console.log(bestBusId * bestDiff, bestBusId, bestDiff);
};

const firstNumToFit = (num) => {
  return Math.ceil(10000000000000 / num) * num;
};

const firstToFitWithIdx = (num, idx) => {
  const thres = 10000000000000;
  //   const thres = 0;
  for (let i = thres; i < thres + num; i++) {
    if (i % num == idx) return i;
  }
};

const part2 = () => {
  let lines = file.toString().split("\n");

  const busIds = lines[1].split(",");
  let masterSet = null;
  busIds.forEach((busId, idx) => {
    if (busId != "x") {
      const busIdMultiples = new Set();
      let wantedMod = parseInt(busId) - (idx % parseInt(busId));
      const first = firstToFitWithIdx(
        parseInt(busId),
        wantedMod == busId ? 0 : wantedMod
      );
      for (let i = 0; i < 99999999; i++) {
        try {
          busIdMultiples.add(first + busId * i);
        } catch (e) {
          console.log(e);
          console.log(first + busId * i);
        }
      }
      if (busId == 557)
        console.log([...busIdMultiples][busIdMultiples.size - 1]);
      //   console.log(busIdMultiples, busId, idx, wantedMod);

      if (masterSet == null) {
        masterSet = busIdMultiples;
      } else {
        masterSet = new Set(
          [...masterSet].filter((x) => busIdMultiples.has(x))
        );
      }
    }
  });

  console.log(masterSet);

  //   for (let i = 10000000000264; i < 100000000000307; i += 557) {
  //     const curr = busIds.filter((busId, idx) => {
  //       if (busId == "x") {
  //         return true;
  //       } else {
  //         return parseInt(busId) - (i % parseInt(busId)) == idx;
  //       }
  //     });
  //     // console.log(curr);
  //     // console.log(i % 557);

  //     // if (i == 1068781) console.log(curr);

  //     if (curr.length == busIds.length - 1) {
  //       console.log(i);
  //     }
  //   }
};

const gcd = (a, b) => {
  if (a == 0) return b;
  else return gcd(b % a, a);
};

const gcdStreams = (a, b, ct) => {
  if (a == 0) return b(ct);
  else return gcdStreams(b(ct) % a, a(ct), ct + 1);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

// Adapted from https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-132.php
function prime_factors(num) {
  function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  const result = new Map();
  for (let i = 2; i <= num; i++) {
    while (is_prime(i) && num % i === 0) {
      if (!result.has(i)) {
        result.set(i, 1);
      } else {
        result.set(i, result.get(i) + 1);
      }
      num /= i;
    }
  }
  return result;
}

const modInverse = (a, b, target) => {
  a %= b;
  const values = [];
  for (var x = 100000000000000; x < b * 999999999999; x++) {
    if ((a * x) % b == target) {
      values.push(x);
    }
  }

  return values;
};

const part2R = () => {
  let lines = file.toString().split("\n");

  const busIds = lines[1].split(",");
  let masterMap = new Map();
  busIds.forEach((busId, idx) => {
    if (busId != "x") {
      const primeFactors = prime_factors(parseInt(busId));
      primeFactors.forEach((a) => {
        if (masterMap.has(a) && masterMap.get(a) < primeFactors.get(a)) {
          masterMap.set(a, primeFactors.get(a));
        } else if (!masterMap.has(a)) {
          masterMap.set(a, primeFactors.get(a));
        }
      });
    }
  });

  let product = 1;
  masterMap.forEach((value, key) => {
    product *= Math.pow(key, value);
  });

  console.log(product);
};

const part3 = () => {
  let lines = file.toString().split("\n");

  const busIds = lines[1].split(",");

  let setIntersection = null;
  busIds.forEach((busId, idx) => {
    if (busId != "x" && idx != 0) {
      // console.log(
      //   modInverse(parseInt(busIds[0]), idx, parseInt(busId) - idx),
      //   busId,
      //   idx
      // );
      const first = parseInt(busIds[0]);
      const inverses = modInverse(
        first,
        parseInt(busId),
        parseInt(busId) - idx
      );
      const currSet = new Set(inverses.map((a) => a * first));
      // console.log(currSet, busId, idx);

      if (setIntersection == null) {
        setIntersection = currSet;
      } else {
        setIntersection = intersection(setIntersection, currSet);
      }
    }
  });

  console.log(setIntersection);
};

const intersection = (a, b) => {
  return [...a].filter((x) => b.has(x));
};

part1();
// part2();
// console.log(lcm(15, 20));
// console.log(prime_factors(100));
// part2R();
// console.log(gcd(8, 10));
// console.log(lcm(8, 10));
part3();
// console.log(modInverse(3, 11));
// console.log(modInverse(17, 13, 11).map((a) => a * 17));
