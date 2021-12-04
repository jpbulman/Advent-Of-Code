using System;
using System.IO;

namespace day2
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

            var horz = 0;
            var vert = 0;
            foreach (var line in lines)
            {
                var lineParts = line.Split(" ");
                var verb = lineParts[0];
                var delta = Int32.Parse(lineParts[1]);

                if (verb == "forward") {
                    horz += delta;
                } else if (verb == "down") {
                    vert += delta;
                } else {
                    vert -= delta;
                }
            }

            Console.WriteLine((horz * vert).ToString());
        }

        public static void p2() {
            var lines = File.ReadLines("input.txt");

            var horz = 0;
            var vert = 0;
            var aim = 0;
            foreach (var line in lines)
            {
                var lineParts = line.Split(" ");
                var verb = lineParts[0];
                var delta = Int32.Parse(lineParts[1]);

                if (verb == "forward") {
                    horz += delta;
                    vert += aim * delta;
                } else if (verb == "down") {
                    aim += delta;
                } else {
                    aim -= delta;
                }
            }

            Console.WriteLine((horz * vert).ToString());
        }
    }
}
