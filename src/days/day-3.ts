import { readFileFromDay } from "../utils/index";

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52.
// Getting the priority by subtracting the asci number to get 1 - 52 output
const getPriority = (char: string) => {
  const charCode: number = char.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  } else if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }
  return 0;
};

const part1 = (data: string[]) => {
  let rucksackPriority: number = 0;

  data.forEach((rucksack: string) => {
    const rucksackHalfCount = rucksack.length / 2;
    const rucksackFirstHalf = rucksack.slice(0, rucksackHalfCount);
    const rucksackSecondHalf = rucksack.slice(rucksackHalfCount);
    // using Set to remove repeating item in half
    new Set(rucksackFirstHalf).forEach((item: string) => {
      if (rucksackSecondHalf.includes(item)) {
        rucksackPriority += getPriority(item);
      }
    });
  });

  return `Rucksack Priority: ${rucksackPriority}`;
};

const part2 = (data: string[]) => {
  let rucksackPriority: number = 0;
  const groupOfRucksack = 3;

  for (let i = 0; i < data.length; i = i + groupOfRucksack) {
    // using Set to remove repeating item in half
    new Set(data[i]).forEach((item: string) => {
      if (data[i + 1].includes(item) && data[i + 2].includes(item)) {
        rucksackPriority += getPriority(item);
      }
    });
  }

  return `Rucksack Priority in group: ${rucksackPriority}`;
};

export default (day: string) => {
  try {
    const input: string = readFileFromDay(day);
    const data: string[] = input.split("\n");
    return {
      part1: part1(data),
      part2: part2(data),
    };
  } catch (error) {
    console.error(`Error on day ${day}: `, error);
  }
};
