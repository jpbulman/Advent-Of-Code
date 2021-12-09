using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace day6
{
    class Program
    {
        static void Main(string[] args)
        {
            p1();
            p2();
        }

        public static void printFishes(List<int> fishes, int day) {
            Console.Write("After 1 ");
        }

        public static void p1() {
            var fishNumbers = File.ReadLines("input.txt").ToList()[0].Split(",").Select(x => Int32.Parse(x)).ToList();
            var day = 1;
            while (day <= 80`) {
                var numFishToAdd = 0;
                for (var i = 0; i < fishNumbers.Count; i++) {
                    var currFish = fishNumbers[i];
                    if (currFish == 0) {
                        fishNumbers[i] = 6;
                        numFishToAdd++;
                    } else {
                        fishNumbers[i] = currFish - 1;
                    }
                }

                for (var i = 0; i < numFishToAdd; i++) {
                    fishNumbers.Add(8);
                }

                day++;
            }

            Console.WriteLine(fishNumbers.Count);
        }

        private static int numFishCreated(int daysRemaining, int lifeSpan) {
            return ((daysRemaining - lifeSpan) / 6) + 1;
        }

        public static void p2() {
            var fishNumbers = File.ReadLines("input.txt").ToList()[0].Split(",").Select(x => Int32.Parse(x)).ToList();

            var sum = 0;
            foreach (var number in fishNumbers) {
                sum += numFishCreated(256, number);
                for (var i = 0; 256 - (number + (8 * i)) > 0; i++) {
                    sum += numFishCreated(256 - (number + (8 * i)), 8);
                }
            }

            Console.WriteLine(sum);
        }
    }
}
