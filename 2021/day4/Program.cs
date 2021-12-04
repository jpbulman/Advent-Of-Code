using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;

namespace day4
{
    class BingoBoard {
        // Could be a hashset, but I'm assuming there might be a board with duplicate values
        private int[,] boardValues;

        private bool[,] squareHasBeenCalled;

        public BingoBoard() {
            boardValues = new int[5, 5];
            squareHasBeenCalled = new bool[5, 5];
        }

        public void printBoard() {
            for (var row = 0; row < 5; row++) {
                for (var col = 0; col < 5; col++) {
                    Console.Write(boardValues[row, col].ToString() + " ");
                }

                Console.WriteLine();
            }
        }
        
        public void printMarkValues() {
            for (var row = 0; row < 5; row++) {
                for (var col = 0; col < 5; col++) {
                    Console.Write(squareHasBeenCalled[row, col] ? "X " : "O ");
                }

                Console.WriteLine();
            }
        }

        public void callValue(int val) {
            for (var row = 0; row < 5; row++) {
                for (var col = 0; col < 5; col++) {
                    if (boardValues[row, col] == val) {
                        squareHasBeenCalled[row, col] = true;
                    }
                }
            }
        }

        public int sumOfAllUnmarkedValues() {
            var sum = 0;
            for (var row = 0; row < 5; row++) {
                for (var col = 0; col < 5; col++) {
                    if (!squareHasBeenCalled[row, col]) {
                        sum += boardValues[row, col];
                    }
                }
            }

            return sum;
        }

        public void initializeRow(int rowNum, string input) {
            // Stolen from https://stackoverflow.com/questions/22142784/split-string-with-variable-number-of-spaces
            var values = input.Split(new [] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

            for (int col = 0; col < 5; col ++) {
                var currNum = Int32.Parse(values[col]);
                this.boardValues[rowNum, col] = currNum;
            }
        }

        public bool isWinner() {
            for (var row = 0; row < 5; row++) {
                if (rowHasWinner(row, 0)) {
                    return true;
                }
            } 

            for (var col = 0; col < 5; col++) {
                if (columnHasWinner(0, col)) {
                    return true;
                }
            } 

            return false;
        }

        private bool columnHasWinner(int row, int col) {
            if (squareHasBeenCalled[row, col]) {
                if (row == 4) {
                    return true;
                } else {
                    return columnHasWinner(row + 1, col);
                }
            } else {
                return false;
            }
        }

        private bool rowHasWinner(int row, int col) {
            if (squareHasBeenCalled[row, col]) {
                if (col == 4) {
                    return true;
                } else {
                    return rowHasWinner(row, col + 1);
                }
            } else {
                return false;
            }
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // p1();
            p2();
        }

        public static void p1() {
            var lines = File.ReadLines("input.txt").ToList();

            int[] numbersToCall = null;

            var bingoBoards = new List<BingoBoard>();
            var currBingoBoard = new BingoBoard();
            var currRowCount = 0;

            for (var i = 0; i < lines.Count; i++) {
                var currLine = lines[i];
                if (i == 0) {
                    numbersToCall = Array.ConvertAll(currLine.Split(","), s => int.Parse(s));
                } else if (i == 1) {
                    continue;
                } else if (currLine == "") {
                    bingoBoards.Add(currBingoBoard);
                    currBingoBoard = new BingoBoard();
                    currRowCount = 0;
                } else {
                    currBingoBoard.initializeRow(currRowCount++, currLine);
                }
            }

            foreach (var currNum in numbersToCall) {
                foreach (var currBoard in bingoBoards) {
                    currBoard.callValue(currNum);
                    if (currBoard.isWinner()) {
                        Console.WriteLine(currBoard.sumOfAllUnmarkedValues());
                        Console.WriteLine(currNum);
                        Console.WriteLine(currBoard.sumOfAllUnmarkedValues() * currNum);
                        return;
                    }
                }
            }
        }

        public static void p2() {
            var lines = File.ReadLines("input.txt").ToList();

            int[] numbersToCall = null;

            var bingoBoards = new List<BingoBoard>();
            var currBingoBoard = new BingoBoard();
            var currRowCount = 0;

            for (var i = 0; i < lines.Count; i++) {
                var currLine = lines[i];
                if (i == 0) {
                    numbersToCall = Array.ConvertAll(currLine.Split(","), s => int.Parse(s));
                } else if (i == 1) {
                    continue;
                } else if (currLine == "") {
                    bingoBoards.Add(currBingoBoard);
                    currBingoBoard = new BingoBoard();
                    currRowCount = 0;
                } else {
                    currBingoBoard.initializeRow(currRowCount++, currLine);
                }
            }

            var bingoBoardsThatAreWinners = new HashSet<int>();
            foreach (var currNum in numbersToCall) {
                for (var i = 0; i < bingoBoards.Count; i++) {
                    var currBoard = bingoBoards[i];

                    currBoard.callValue(currNum);
                    if (currBoard.isWinner()) {
                        bingoBoardsThatAreWinners.Add(i);
                        if (bingoBoardsThatAreWinners.Count == bingoBoards.Count) {
                            Console.WriteLine(bingoBoardsThatAreWinners.Count);
                            Console.WriteLine(bingoBoards.Count);
                            Console.WriteLine(currBoard.sumOfAllUnmarkedValues());
                            Console.WriteLine(currNum);
                            Console.WriteLine(currBoard.sumOfAllUnmarkedValues() * currNum);
                            return;
                        }
                    }
                }
            }
        }
    }
}
