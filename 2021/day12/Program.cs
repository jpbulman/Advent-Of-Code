using System;
using System.IO;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace day12
{
    class Node {
        public string name;

        public bool isStart;

        public bool isEnd;

        public HashSet<Node> neighbors;

        public Node(string name) {
            this.name = name;
            this.neighbors = new HashSet<Node>();

            if (name == "start") {
                this.isStart = true;
            } else if (name == "end") {
                this.isEnd = true;
            }
        }

        public void AddNeighbor(Node n) {
            this.neighbors.Add(n);
        }

        public void printNeighbors() {
            Console.Write(this.name + ": ");
            foreach (var neighbor in this.neighbors) {
                Console.Write(neighbor.name + ",");
            }
            Console.WriteLine();
        }

        public bool isUpper() {
            return Char.IsUpper(this.name[0]);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            p1and2();
        }

        private static void p1and2() {
            var lines = File.ReadLines("input.txt");

            var nodesByName = new Dictionary<string, Node>();
            foreach (var line in lines) {
                var sides = line.Split("-");
                var first = sides[0];
                var second = sides[1];

                Node firstNode;
                if (nodesByName.ContainsKey(first)) {
                    firstNode = nodesByName[first];
                } else {
                    firstNode = new Node(first);
                    nodesByName.Add(first, firstNode);
                }

                Node secondNode;
                if (nodesByName.ContainsKey(second)) {
                    secondNode = nodesByName[second];
                } else {
                    secondNode = new Node(second);
                    nodesByName.Add(second, secondNode);
                }

                firstNode.AddNeighbor(secondNode);
                secondNode.AddNeighbor(firstNode);
            }

            Console.WriteLine(explore(nodesByName["start"]));
            Console.WriteLine(explore2(nodesByName["start"]));
        }

        private static int explore(Node start) {
            var sum = 0;
            foreach (var neighbor in start.neighbors) {
                sum += explore(neighbor, new HashSet<Node>(){ start });
            }

            return sum;
        }

        private static int explore(Node curr, HashSet<Node> seen) {
            if (curr.isEnd) {
                return 1;
            } else {
                // add ourselves
                if (!curr.isUpper()) {
                    seen.Add(curr);
                }
                // explore neighbors
                var sum = 0;
                foreach (var neighbor in curr.neighbors) {
                    if (!seen.Contains(neighbor)) {
                        var val = explore(neighbor, new HashSet<Node>(seen));
                        sum += val;
                    } 
                }

                return sum;
            }
        }

        private static int explore2(Node start) {
            var uniquePaths = new HashSet<string>();
            foreach (var neighbor in start.neighbors) {
                var results = explore2(neighbor, new HashSet<Node>(){ start }, "", 0, "start,");
                foreach (var res in results) {
                    uniquePaths.Add(res);
                }
            }

            foreach (var path in uniquePaths) {
                // Console.WriteLine(path);
            }

            return uniquePaths.Count;
        }

        private static HashSet<string> explore2(Node curr, HashSet<Node> seen, string nodeToGoTwice, int doubleNodeTimesGone, string logPath) {
            if (curr.isEnd) {
                return new HashSet<string>(){ logPath + "end" };
            } else {
                var addedIntoCycle = false;
                // add ourselves
                if (!curr.isUpper()) {
                    if (nodeToGoTwice == curr.name) {
                        doubleNodeTimesGone += 1;
                        if (doubleNodeTimesGone == 2) {
                            seen.Add(curr);
                        }
                    } else if (nodeToGoTwice == "") {
                        addedIntoCycle = true;
                        nodeToGoTwice = curr.name;
                        doubleNodeTimesGone = 1;
                    } else {
                        // spot is taken already
                        seen.Add(curr);
                    }
                }
                var logPaths = new HashSet<string>();
                foreach (var neighbor in curr.neighbors) {
                    if (!seen.Contains(neighbor)) {
                        var seenCopy = new HashSet<Node>(seen);
                        var vals = explore2(neighbor, seenCopy, nodeToGoTwice, doubleNodeTimesGone, logPath + curr.name + ",");
                        foreach (var v in vals) {
                            logPaths.Add(v);
                        }

                        if (addedIntoCycle) {
                            var newSeenCopy = new HashSet<Node>(seen);
                            newSeenCopy.Add(curr);
                            var newVals = explore2(neighbor, newSeenCopy, "", 0, logPath + curr.name + ",");
                            foreach (var n in newVals) {
                                logPaths.Add(n);
                            }
                        }
                    }
                }

                return logPaths;
            }
        }
    }
}
