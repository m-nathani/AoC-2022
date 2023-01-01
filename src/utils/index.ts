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

export function replaceAll(input: string, target: string, payload: string) {
  const regex = new RegExp(target, "g");
  return input.replace(regex, payload);
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: never, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const stringifyCircularJson = (circularReference: unknown) =>
  JSON.stringify(circularReference, getCircularReplacer() as never);
