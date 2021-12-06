using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace day5
{
    class Program
    {
        static void Main(string[] args)
        {
            p1();
            p2();
        }

        public static void p1() {
            var lines = File.ReadLines("input.txt").ToList();
            
            var timesCoordinateHasAnIntersection = new Dictionary<string, int>();
            foreach (var line in lines) {
                var split = line.Split(" -> ");
                var firstPair = split[0].Split(",");
                var secondPair = split[1].Split(",");

                var x1 = int.Parse(firstPair[0]);
                var y1 = int.Parse(firstPair[1]);
                var x2 = int.Parse(secondPair[0]);
                var y2 = int.Parse(secondPair[1]);

                if (x1 == x2) {
                    var smallerY = y1 < y2 ? y1 : y2;
                    var largerY = y1 > y2 ? y1 : y2;
                    
                    for (var i = smallerY; i <= largerY; i++) {
                        var currPair = x1.ToString() + "," + i.ToString();

                        var currCount = 0;
                        timesCoordinateHasAnIntersection.TryGetValue(currPair, out currCount);
                        timesCoordinateHasAnIntersection[currPair] = currCount + 1;
                    }
                } else if (y1 == y2) {
                    var smallerX = x1 < x2 ? x1 : x2;
                    var largerX = x1 > x2 ? x1 : x2;
                    
                    for (var i = smallerX; i <= largerX; i++) {
                        var currPair = i.ToString() + "," + y1.ToString();

                        var currCount = 0;
                        timesCoordinateHasAnIntersection.TryGetValue(currPair, out currCount);
                        timesCoordinateHasAnIntersection[currPair] = currCount + 1;
                    }
                }
            }

            var count = 0;
            foreach (var (key, value) in timesCoordinateHasAnIntersection) {
                if (value != 1) {
                    count++;
                }
            }

            Console.WriteLine(count);
        }

        public static void p2() {
            var lines = File.ReadLines("input.txt").ToList();
            
            var timesCoordinateHasAnIntersection = new Dictionary<string, int>();
            foreach (var line in lines) {
                var split = line.Split(" -> ");
                var firstPair = split[0].Split(",");
                var secondPair = split[1].Split(",");

                var x1 = int.Parse(firstPair[0]);
                var y1 = int.Parse(firstPair[1]);
                var x2 = int.Parse(secondPair[0]);
                var y2 = int.Parse(secondPair[1]);

                if (x1 == x2) {
                    var smallerY = y1 < y2 ? y1 : y2;
                    var largerY = y1 > y2 ? y1 : y2;
                    
                    for (var i = smallerY; i <= largerY; i++) {
                        var currPair = x1.ToString() + "," + i.ToString();

                        var currCount = 0;
                        timesCoordinateHasAnIntersection.TryGetValue(currPair, out currCount);
                        timesCoordinateHasAnIntersection[currPair] = currCount + 1;
                    }
                } else if (y1 == y2) {
                    var smallerX = x1 < x2 ? x1 : x2;
                    var largerX = x1 > x2 ? x1 : x2;

                    // Console.WriteLine("* " + x1.ToString() + ", " + y1.ToString() + " / " + x2.ToString() + ", " + y2.ToString() + " *");
                    for (var i = smallerX; i <= largerX; i++) {
                        var currPair = i.ToString() + "," + y1.ToString();

                        var currCount = 0;
                        timesCoordinateHasAnIntersection.TryGetValue(currPair, out currCount);
                        timesCoordinateHasAnIntersection[currPair] = currCount + 1;
                    }
                } else {
                    var deltaX = x1 < x2 ? 1 : -1;
                    var deltaY = y1 < y2 ? 1 : -1;
                    
                    // Console.WriteLine("* " + x1.ToString() + ", " + y1.ToString() + " / " + x2.ToString() + ", " + y2.ToString() + " *");
                    for (int i = x1, j = y1; i != x2; i += deltaX, j += deltaY) {
                        var currPair = i.ToString() + "," + j.ToString();

                        var currCount = 0;
                        timesCoordinateHasAnIntersection.TryGetValue(currPair, out currCount);
                        timesCoordinateHasAnIntersection[currPair] = currCount + 1;
                    }

                    // Annoying, but whatever
                    var xPair = x2.ToString() + "," + y2.ToString();
                    var xCt = 0;
                    timesCoordinateHasAnIntersection.TryGetValue(xPair, out xCt);
                    timesCoordinateHasAnIntersection[xPair] = xCt + 1;
                }
            }

            var count = 0;
            foreach (var (key, value) in timesCoordinateHasAnIntersection) {
                if (value != 1) {
                    count++;
                }
            }

            Console.WriteLine(count);
        }
    }
}
