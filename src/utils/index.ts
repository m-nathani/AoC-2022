import { readFileSync } from "fs";
import { resolve } from "path";
import readline from "readline";

export const readFileFromDay = (day: string) => {
  return readFileSync(resolve(process.cwd(), `inputs/day-${day}.txt`), "utf8");
};

export const prompt = (question: string, callback: (input: string) => void) => {
  const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  read.question(question, (input) => {
    callback(input);
    read.close();
  });
};
