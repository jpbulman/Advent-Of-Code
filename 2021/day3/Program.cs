using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace day3
{
    class Program
    {
        static void Main(string[] args)
        {
            p1();
            p2();
        }

        public static void p1() {
            var lines = File.ReadLines("input.txt");

            Dictionary<int, int> zeroesAtPosition = new Dictionary<int, int>();
            Dictionary<int, int> onesAtPosition = new Dictionary<int, int>();
            foreach (var line in lines)
            {
                for (int i = 0; i < line.Length; i++) {
                    var currChar = line[i].ToString();
                    if (currChar == "1") {
                        var currCount = 0;
                        onesAtPosition.TryGetValue(i, out currCount);
                        onesAtPosition[i] = (currCount + 1);
                    } else {
                        var currCount = 0;
                        zeroesAtPosition.TryGetValue(i, out currCount);
                        zeroesAtPosition[i] = (currCount + 1);
                    }
                }
            }

            var onesKeys = onesAtPosition.Keys.ToList();
            onesKeys.Sort();
            var res = "";
            foreach (var key in onesKeys) {
                var currVal = onesAtPosition[key];
                var currZeroes = zeroesAtPosition[key];
                if (currVal > currZeroes) {
                    res += "1";
                } else {
                    res += "0";
                }
            }

            // Console.WriteLine(res);
        }

        public static void p2() {
            var lines = File.ReadLines("input.txt");

            Dictionary<int, int> zeroesAtPositionGre = countsPos("0", lines);
            Dictionary<int, int> onesAtPositionGre = countsPos("1", lines);

            Dictionary<int, int> zeroesAtPositionLe = countsPos("0", lines);
            Dictionary<int, int> onesAtPositionLe = countsPos("1", lines);

            // foreach (var line in lines)
            // {
            //     for (int i = 0; i < line.Length; i++) {
            //         var currChar = line[i].ToString();
            //         if (currChar == "1") {
            //             var currCount = 0;
            //             onesAtPosition.TryGetValue(i, out currCount);
            //             onesAtPosition[i] = (currCount + 1);
            //         } else {
            //             var currCount = 0;
            //             zeroesAtPosition.TryGetValue(i, out currCount);
            //             zeroesAtPosition[i] = (currCount + 1);
            //         }
            //     }
            // }

            var onesKeys = onesAtPositionGre.Keys.ToList();
            onesKeys.Sort();
            var oxyToMoveOn = lines;
            foreach (var key in onesKeys) {
                var currVal = onesAtPositionGre[key];
                var currZeroes = zeroesAtPositionGre[key];

                Console.WriteLine(key.ToString() + " "  + currVal.ToString() + " " + currZeroes.ToString() + " ");

                if (currVal >= currZeroes) {
                    oxyToMoveOn = oxyToMoveOn.Where(s => s[key].ToString() == "1");
                    zeroesAtPositionGre = countsPos("0", oxyToMoveOn);
                    onesAtPositionGre = countsPos("1", oxyToMoveOn);
                } else {
                    oxyToMoveOn = oxyToMoveOn.Where(s => s[key].ToString() == "0");
                    zeroesAtPositionGre = countsPos("0", oxyToMoveOn);
                    onesAtPositionGre = countsPos("1", oxyToMoveOn);
                }
            }

            Console.WriteLine(oxyToMoveOn.ToList()[0]);

            var onesLeKeys = onesAtPositionLe.Keys.ToList();
            onesLeKeys.Sort();
            var co2ToMoveOn = lines;
            foreach (var key in onesLeKeys) {
                if (co2ToMoveOn.ToList().Count < 2) {
                    continue;
                }

                var currOnes = onesAtPositionLe[key];
                var currZeroes = zeroesAtPositionLe[key];

                Console.WriteLine(key.ToString() + " "  + currOnes.ToString() + " " + currZeroes.ToString() + " ");

                if (currZeroes <= currOnes) {
                    co2ToMoveOn = co2ToMoveOn.Where(s => s[key].ToString() == "0");
                    zeroesAtPositionLe = countsPos("0", co2ToMoveOn);
                    onesAtPositionLe = countsPos("1", co2ToMoveOn);
                } else {
                    co2ToMoveOn = co2ToMoveOn.Where(s => s[key].ToString() == "1");
                    zeroesAtPositionLe = countsPos("0", co2ToMoveOn);
                    onesAtPositionLe = countsPos("1", co2ToMoveOn);
                }
            }

            Console.WriteLine(oxyToMoveOn.ToList()[0]);
            Console.WriteLine(co2ToMoveOn.ToList()[0]);
        }

        public static Dictionary<int, int> countsPos(string s, IEnumerable<string> lines) {
            Dictionary<int, int> onesAtPosition = new Dictionary<int, int>();
            foreach (var line in lines)
            {
                for (int i = 0; i < line.Length; i++) {
                    var currChar = line[i].ToString();
                    if (currChar == s) {
                        var currCount = 0;
                        onesAtPosition.TryGetValue(i, out currCount);
                        onesAtPosition[i] = currCount + 1;
                    } else {
                        if (!onesAtPosition.ContainsKey(i)) {
                            onesAtPosition[i] = 0;
                        }
                    }
                }
            }

            return onesAtPosition;
        }
    }
}
