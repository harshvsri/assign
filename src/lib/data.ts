export const problem = {
  title: "Two Sum",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  difficulty: "Easy",
  examples: [
    {
      input: "arr = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "arr = [3, 2, 4], target = 6",
      output: "[1, 2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "arr = [3, 3], target = 6",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  testCases: [
    {
      input: "4\n2 7 11 15\n9",
      expectedOutput: "[ 0, 1 ]",
    },
    {
      input: "3\n3 2 4\n6",
      expectedOutput: "[ 1, 2 ]",
    },
    {
      input: "2\n3 3\n6",
      expectedOutput: "[ 0, 1 ]",
    },
    {
      input: "4\n1 5 3 4\n7",
      expectedOutput: "[ 1, 3 ]",
    },
    {
      input: "5\n1 2 3 4 5\n9",
      expectedOutput: "[ 3, 4 ]",
    },
  ],
  starterCode: `"use strict";

let input = "";
let currentLine = 0;
process.stdin.on("data", (input_data) => {
  input += input_data;
});

process.stdin.on("end", () => {
  input = input.split("\\n");
  main();
});

const readLine = () => {
  return input[currentLine++];
};

const main = () => {
  // This section needs to be handled by the user
  // const size = Number(readLine().trim());
  // const arr = readLine().trim().split(" ").map(Number);

  // Main fn execution
  console.log(arrSum(size, arr));
};

const arrSum = (size, arr) => {
  // Enter your code here
};
`,
};
