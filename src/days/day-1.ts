import { readFileFromDay } from "../utils/index";

const part1 = (data: string[]) => {
  let elfCalories = 0;
  let elfIndex = 0;
  let maxCalories = 0;
  let maxElfIndex = 0;

  data.forEach((calories: string) => {
    if (calories !== "") {
      elfCalories += +calories;
    } else {
      // finding the max calories and the Elf number
      if (elfCalories > maxCalories) {
        maxCalories = elfCalories;
        maxElfIndex = elfIndex;
      }
      // reset Elf calories for the next elf
      elfCalories = 0;
      // increase counter for the next elf
      elfIndex += 1;
    }
  });

  return `Elf ${maxElfIndex + 1} has the maximum calories: ${maxCalories}`;
};

const part2 = (data: string[]) => {
  let elfIndex = 0;
  let elfCalories = 0;
  const topCalories: number[] = [0, 0, 0];

  data.forEach((calories: string) => {
    if (calories !== "") {
      elfCalories += +calories;
    } else {
      if (elfCalories > topCalories[0]) {
        topCalories[2] = topCalories[1];
        topCalories[1] = topCalories[0];
        topCalories[0] = elfCalories;
      }

      if (elfCalories < topCalories[0] && elfCalories > topCalories[1]) {
        topCalories[2] = topCalories[1];
        topCalories[1] = elfCalories;
      }

      if (elfCalories < topCalories[1] && elfCalories > topCalories[2]) {
        topCalories[2] = elfCalories;
      }

      elfIndex = elfIndex + 1;
      elfCalories = 0;
    }
  });

  return `Sum of top 3 Elfs calories is: ${topCalories[0] + topCalories[1] + topCalories[2]}`;
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
    console.error(`Error on day : ${day}`, error);
  }
};
