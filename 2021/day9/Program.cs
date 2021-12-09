using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace day9
{
    class Program
    {
        static void Main(string[] args)
        {
            p1();
            p2();
        }

        private static void p1() {
            var lines = File.ReadLines("input.txt").ToList();
            int[,] board = new int[lines.Count, lines[0].Length];

            for (var i = 0; i < lines.Count; i++) {
                var line = lines[i];
                for (var j = 0; j < line.Length; j++) {
                    var curr = int.Parse(line[j].ToString());
                    board[i, j] = curr;
                }
            }
            
            var lows = new List<int>();
            for (var row = 0; row < lines.Count; row++) {
                for (var col = 0; col < lines[0].Length; col++) {
                    var currVal = board[row, col];
                    var spotIsLeftEdge = col == 0;
                    var spotIsRightEdge = col == lines[0].Length - 1;
                    var spotIsTopEdge = row == 0;
                    var spotIsBottomEdge = row == lines.Count - 1;

                    int? spotAbove = spotIsTopEdge ? null : board[row - 1, col];
                    int? spotBelow = spotIsBottomEdge ? null : board[row + 1, col];
                    int? spotLeft = spotIsLeftEdge ? null : board[row, col - 1];
                    int? spotRight = spotIsRightEdge ? null : board[row, col + 1];

                    var values = new List<int?> { spotAbove, spotBelow, spotLeft, spotRight };
                    values = values.Where(v => v != null).ToList();

                    var valueIsLowPoint = true;
                    foreach (var currAdjVal in values) {
                        if (currAdjVal <= currVal) {
                            valueIsLowPoint = false;
                        }
                    }

                    if (valueIsLowPoint) {
                        lows.Add(currVal + 1);
                        // Console.Write(currVal.ToString() + " " + row.ToString() + "," + col.ToString() + "::");
                        // foreach (var currAdjVal in values) {
                        //     Console.Write(currAdjVal.ToString() + ",");
                        // }
                        // Console.WriteLine();
                    }
                }
            }

            Console.WriteLine(lows.Sum());
        }

        
        private static void p2() {
            var lines = File.ReadLines("input.txt").ToList();
            int[,] board = new int[lines.Count, lines[0].Length];

            for (var i = 0; i < lines.Count; i++) {
                var line = lines[i];
                for (var j = 0; j < line.Length; j++) {
                    var curr = int.Parse(line[j].ToString());
                    board[i, j] = curr;
                }
            }
            
            var lows = new List<(int row, int col)>();
            for (var row = 0; row < lines.Count; row++) {
                for (var col = 0; col < lines[0].Length; col++) {
                    var currVal = board[row, col];
                    var adjValues = getAdjacentValues(board, row, col);

                    var valueIsLowPoint = true;
                    foreach (var currAdjVal in adjValues) {
                        if (currAdjVal <= currVal) {
                            valueIsLowPoint = false;
                        }
                    }

                    if (valueIsLowPoint) {
                        lows.Add((row, col));
                    }
                }
            }

            var basinSizeList = new List<int>();
            foreach (var low in lows) {
                var bL = basinLength(board, low.row, low.col, new HashSet<string>(), 0);
                basinSizeList.Add(bL);
            }
            basinSizeList.Sort();

            Console.WriteLine(basinSizeList[basinSizeList.Count - 1] * basinSizeList[basinSizeList.Count - 2] * basinSizeList[basinSizeList.Count - 3]);
        }

        private static int basinLength(int[,] board, int row, int col, HashSet<string> seenPairs, int currCount) {
            var currPairString = row.ToString() + "," + col.ToString();

            if (seenPairs.Contains(currPairString)) {
                return 0;
            } else {
                seenPairs.Add(currPairString);

                // 1 for the current coordinate
                var totalLength = 1;
                var adjPairs = getAdjacentPairs(board, row, col);
                foreach (var currAdjPair in adjPairs) {
                    if (board[currAdjPair.row, currAdjPair.col] != 9) {
                        var otherBasinLength = basinLength(board, currAdjPair.row, currAdjPair.col, seenPairs, totalLength);
                        totalLength += otherBasinLength;
                    }
                }

                return totalLength;
            }
        }

        private static List<int?> getAdjacentValues(int[,] board, int row, int col) {
            var spotIsLeftEdge = col == 0;
            var spotIsRightEdge = col == board.GetLength(1) - 1;
            var spotIsTopEdge = row == 0;
            var spotIsBottomEdge = row == board.GetLength(0) - 1;

            int? spotAbove = spotIsTopEdge ? null : board[row - 1, col];
            int? spotBelow = spotIsBottomEdge ? null : board[row + 1, col];
            int? spotLeft = spotIsLeftEdge ? null : board[row, col - 1];
            int? spotRight = spotIsRightEdge ? null : board[row, col + 1];

            var values = new List<int?> { spotAbove, spotBelow, spotLeft, spotRight };
            return values.Where(v => v != null).ToList();
        }

        // Pretty garbage
        private static List<(int row, int col)> getAdjacentPairs(int[,] board, int row, int col) {
            var spotIsLeftEdge = col == 0;
            var spotIsRightEdge = col == board.GetLength(1) - 1;
            var spotIsTopEdge = row == 0;
            var spotIsBottomEdge = row == board.GetLength(0) - 1;

            (int, int)? spotAbove = spotIsTopEdge ? null : (row - 1, col);
            (int, int)? spotBelow = spotIsBottomEdge ? null : (row + 1, col);
            (int, int)? spotLeft = spotIsLeftEdge ? null : (row, col - 1);
            (int, int)? spotRight = spotIsRightEdge ? null : (row, col + 1);

            var values = new List<(int, int)?> { spotAbove, spotBelow, spotLeft, spotRight };
            return values.Where(v => v != null).Select(t => t.Value).ToList();
        }
    }
}
