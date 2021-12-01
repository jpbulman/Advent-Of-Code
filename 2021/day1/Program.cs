using System;
using System.IO;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadLines("input.txt");
            foreach (var line in lines)
            {
                Console.WriteLine(line);
            }
        }
    }
}
