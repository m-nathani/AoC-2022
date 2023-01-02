import { argv } from "process";
import { prompt } from "./utils";

async function main(day: string) {
  try {
    const adventDay = await import(`./days/day-${day}`);
    const answer: { part1?: string; part2?: string } | undefined = adventDay.default(day);

    console.table([{ Day: day, Part1: answer?.part1, Part2: answer?.part2 }]);
  } catch (error) {
    console.error(`No AdventOfCode exists for the day: ${day}`, error);
  }
}

if (argv[2]) {
  main(argv[2]);
} else {
  prompt("Please enter the day you want to run advent of code :", async (day) => {
    main(day);
  });
}
