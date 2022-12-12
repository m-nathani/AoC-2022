import { readFileFromDay } from "../utils/index";

// A for Rock, B for Paper, and C for Scissors - Opponent input
// X for Rock, Y for Paper, and Z for Scissors - Your input
// 1 for Rock, 2 for Paper, and 3 for Scissors - Score for shape you selected
// 0 if you lost, 3 if the round was a draw, and 6 if you won - Score of the round

type Round = "A X" | "A Y" | "A Z" | "B X" | "B Y" | "B Z" | "C X" | "C Y" | "C Z";

const part1 = (data: Round[]) => {
  let score: number = 0;
  const scoreBoard: Record<Round, number> = {
    "A X": 4, // 3 + 1
    "A Y": 8, // 6 + 2
    "A Z": 3, // 0 + 3
    "B X": 1,
    "B Y": 5,
    "B Z": 9,
    "C X": 7,
    "C Y": 2,
    "C Z": 6,
  };

  data.forEach((round: Round) => {
    score += scoreBoard[round];
  });

  return `Elf score: ${score}`;
};

// X mean you lose, Y means you draw, and Z means you win - Your input

const part2 = (data: Round[]) => {
  let score: number = 0;
  const scoreBoard: Record<Round, number> = {
    "A X": 3, // 0 + 3 (lose + scissors)
    "B X": 1,
    "C X": 2,
    "A Y": 4, // 3 + 1 (draw + rock)
    "B Y": 5,
    "C Y": 6,
    "A Z": 8, // 6 + 2 (win + paper)
    "B Z": 9,
    "C Z": 7,
  };

  data.forEach((round: Round) => {
    score += scoreBoard[round];
  });

  return `Elf score is with new strategy: ${score}`;

  return "";
};

export default (day: string) => {
  try {
    const input: string = readFileFromDay(day);
    const data = input.split("\n") as Round[];

    return {
      part1: part1(data),
      part2: part2(data),
    };
  } catch (error) {
    console.error(`Error on day ${day}: `, error);
  }
};
