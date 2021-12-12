using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace day10
{
    class Program
    {
        static void Main(string[] args)
        {
            p1();
            p2();
        }
        
        private static void p1() {
            var lines = File.ReadLines("input.txt");

            var breakingCharacters = new List<string>();
            foreach (var line in lines) {
                var badChar = getBadCharacterFromLine(line);
                if (badChar != "") {
                    breakingCharacters.Add(badChar);
                }
            }

            var sum = 0;
            foreach (var b in breakingCharacters) {
                sum += getPointVal(b);
            }

            Console.WriteLine(sum);
        }

         private static void p2() {
            var lines = File.ReadLines("input.txt");

            var missingScores = new List<long>();
            foreach (var line in lines) {
                var badChar = getBadCharacterFromLine(line);
                if (badChar == "") {
                    var missingChars = getMissingCharactersFromLine(line);
                    missingScores.Add(getScoreForLine(missingChars));
                } else {
                    continue;
                }
            }

            missingScores.Sort();
            foreach (var score in missingScores) {
                Console.WriteLine(score);
            }

            Console.WriteLine(missingScores[missingScores.Count / 2]);
        }

        private static long getScoreForLine(string s) {
            long score = 0;
            for (var i = 0; i < s.Length; i++) {
                score *= 5;
                score += getPointValForMissing(s[i].ToString());
            }

            return score;
        }

        private static long getPointValForMissing(string s) {
            switch (s) {
                case ")":
                    return 1;
                case "]":
                    return 2;
                case "}":
                    return 3;
                default:
                    return 4;
            }
        }

        private static int getPointVal(string s) {
            switch (s) {
                case ")":
                    return 3;
                case "]":
                    return 57;
                case "}":
                    return 1197;
                default:
                    return 25137;
            }
        }

        private static string getBadCharacterFromLine(string line) {
            var prevCharacters = new Stack<string>();
            for (var i = 0; i < line.Length; i++) {
                var curr = line[i].ToString();
                if (isLeftCharacter(curr)) {
                    prevCharacters.Push(curr);
                } else {
                    var charNeeded = oppositeRightCharacter(prevCharacters.Peek());
                    if (curr == charNeeded) {
                        prevCharacters.Pop();
                    } else {
                        return curr;
                    }
                }
            }

            return "";
        }

        private static string getMissingCharactersFromLine(string line) {
            var prevCharacters = new Stack<string>();
            for (var i = 0; i < line.Length; i++) {
                var curr = line[i].ToString();
                if (isLeftCharacter(curr)) {
                    prevCharacters.Push(curr);
                } else {
                    var charNeeded = oppositeRightCharacter(prevCharacters.Peek());
                    if (curr == charNeeded) {
                        prevCharacters.Pop();
                    } else {
                        Console.WriteLine("Line is corrupted and not missing");
                        return curr;
                    }
                }
            }

            if (prevCharacters.Count == 0) {
                return "";
            } else {
                var missingCharacters = "";
                while(prevCharacters.Count != 0) {
                    missingCharacters += oppositeRightCharacter(prevCharacters.Pop());
                }

                return missingCharacters;
            }
        }

        private static bool isLeftCharacter(string s) {
            return s == "<" || s == "{" || s == "(" || s == "[";
        }

        private static string oppositeRightCharacter(string s) {
            switch (s) {
                case "[":
                    return "]";
                case "{":
                    return "}";
                case "<":
                    return ">";
                default:
                    return ")";
            }
        }
    }
}
