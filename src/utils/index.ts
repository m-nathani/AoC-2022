import { readFileSync } from "fs";
import { resolve } from "path";

export const readFileFromDay = (day: number) => {
  return readFileSync(resolve(process.cwd(), `inputs/day-${day}.txt`), "utf8");
};
