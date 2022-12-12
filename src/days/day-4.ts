import { readFileFromDay } from "../utils/index";

const part1 = (data: string[]) => {
  let pairsOverlapping: number = 0;

  data.forEach((pairs: string) => {
    const [firstPair, secondPair] = pairs.split(",");
    const [firstStart, firstEnd] = firstPair.split("-");
    const [secondStart, secondEnd] = secondPair.split("-");
    // .123..       012345
    // 012345   ||  ..23..
    if (
      (+firstStart >= +secondStart && +firstEnd <= +secondEnd) ||
      (+secondStart >= +firstStart && +secondEnd <= +firstEnd)
    ) {
      pairsOverlapping += 1;
    }
  });

  return `Elfs pair's fully overlapping: ${pairsOverlapping}`;
};

const part2 = (data: string[]) => {
  let pairsOverlapping: number = 0;

  data.forEach((pairs: string) => {
    const [firstPair, secondPair] = pairs.split(",");
    const [firstStart, firstEnd] = firstPair.split("-");
    const [secondStart, secondEnd] = secondPair.split("-");
    // ..234....       ...34.
    // ......678       01....
    if (
      !(
        (+firstStart < +secondStart && +firstEnd < +secondStart) ||
        (+secondStart < +firstStart && +secondEnd < +firstStart)
      )
    ) {
      pairsOverlapping += 1;
    }
  });

  return `Elfs pair's overlapping: ${pairsOverlapping}`;
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
