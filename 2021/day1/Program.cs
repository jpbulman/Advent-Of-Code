using System;
using System.IO;
using System.Linq;

namespace day1
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadLines("input.txt");

            int[] nums =  new int[lines.Count()];

            int i = 0;
            foreach (var line in lines)
            {
                int lineAsNum = Int32.Parse(line);
                nums[i++] = lineAsNum;
            }

            int count = 0;
            int idx = 0;
            foreach (int j in nums) {
                if (idx < 3) {
                    idx++;
                    continue;
                }

                int currSum = nums[idx] + nums[idx - 1] + nums[idx - 2];
                int prevSum = nums[idx - 1] + nums[idx - 2] + nums[idx - 3];
                if (currSum > prevSum) {count++;}
                idx++;
            }

            Console.WriteLine(count);
        }

        private static int aocMethod(int a) {
            return 1;
        }
    }
}
