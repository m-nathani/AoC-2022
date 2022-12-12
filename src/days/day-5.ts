import { readFileFromDay, replaceAll } from "../utils/index";

const parseCranes = (crates: string[]) => {
  const cratesSize = crates.pop();
  const createsLength = cratesSize?.split(" ").filter((cratesNumber: string) => +cratesNumber);
  const crateStructure: string[][] = new Array(createsLength?.length)
    .fill(0)
    .map((_) => new Array(0));

  crates.forEach((crate: string) => {
    const stackItem = replaceAll(crate, "    ", " ").split(" ");
    stackItem.forEach((item: string, index: number) => {
      if (item) {
        crateStructure[index].unshift(item);
      }
    });
  });

  return crateStructure;
};

const parseInstructions = (procedure: string) => {
  const data = procedure.split(" ");
  return {
    quantity: +data[1],
    from: +data[3] - 1,
    to: +data[5] - 1,
  };
};

const part1 = (data: string[]) => {
  const crates: string[] = [];
  let line: number = 0;

  while (data[line] !== "") {
    crates.push(data[line]);
    line++;
  }

  const cratesStructure = parseCranes(crates);

  line++; // move to next line

  while (data[line]) {
    const { quantity, from, to } = parseInstructions(data[line]);

    new Array(quantity).fill(0).forEach((_) => {
      const item = cratesStructure[from].pop();
      if (item) {
        cratesStructure[to].push(item);
      }
    });
    line++;
  }

  return `Crate top of each stack: ${replaceAll(
    replaceAll(
      cratesStructure
        .map((stack: string[]) => {
          return stack[stack.length - 1];
        })
        .join(""),
      "\\[",
      ""
    ),
    "\\]",
    ""
  )}`;
};

const part2 = (data: string[]) => {
  const crates: string[] = [];
  let line: number = 0;

  while (data[line] !== "") {
    crates.push(data[line]);
    line++;
  }

  const cratesStructure = parseCranes(crates);

  line++; // move to next line

  while (data[line]) {
    const { quantity, from, to } = parseInstructions(data[line]);
    const itemsToMove: string[] = cratesStructure[from].splice(-1 * quantity);

    cratesStructure[to].push(...itemsToMove);
    line++;
  }

  return `Crate top of each stack: ${replaceAll(
    replaceAll(
      cratesStructure
        .map((stack: string[]) => {
          return stack[stack.length - 1];
        })
        .join(""),
      "\\[",
      ""
    ),
    "\\]",
    ""
  )}`;
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
