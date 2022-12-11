import day1 from "./days/day-1";
import day2 from "./days/day-2";
import { prompt } from "./utils";

prompt("Please enter the day you want to run advent of code :", (day) => {
  try {
    let answer: { part1?: string; part2?: string } | undefined = {};

    switch (day) {
      case "1":
        answer = day1(day);
        break;
      case "2":
        answer = day2(day);
        break;
      default:
        throw "Invalid day entered";
    }

    console.table([{ Day: 1, Part1: answer?.part1, Part2: answer?.part2 }]);
  } catch (error) {
    console.error(`No AdventOfCode exists for the day: ${day}`);
  }
});
