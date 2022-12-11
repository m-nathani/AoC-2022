import { readFileFromDay } from "../utils/index";

const part1 = (data: string[]) => {
  return "";
};

const part2 = (data: string[]) => {
  return "";
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
