import { readFileFromDay, stringifyCircularJson } from "../utils/index";

interface File {
  name: string;
  size: number;
}
interface Tree {
  parent: null | Tree;
  current: string;
  children: Tree[];
  files: File[];
  size: number;
}

const tree: Tree = {
  parent: null,
  current: "/",
  children: [],
  files: [],
  size: 0,
};

let currentNode: Tree = tree;

const traverseTree = (arg: string) => {
  if ("/" === arg) {
    currentNode = tree;
    return;
  }
  if (".." === arg) {
    // to check if the parent is not null, i.e root, then you can move a dir upwards
    if (currentNode?.parent) {
      currentNode = currentNode?.parent;
    }
    return;
  }
  if (arg) {
    const node = currentNode.children.find((child) => child.current === arg);
    if (node) {
      currentNode = node;
    }
  }
};

const createTree = (command: string, arg: string) => {
  if (command && arg) {
    if (command === "dir") {
      currentNode.children.push({
        parent: currentNode,
        current: arg,
        children: [],
        files: [],
        size: 0,
      });
      return;
    }

    currentNode.files.push({
      name: arg,
      size: +command,
    });
  }
};

const parseCommand = (command: string, arg: string): void => {
  switch (command) {
    case "cd": {
      traverseTree(arg);
      break;
    }
    case "ls": {
      break;
    }
    default:
      throw new Error("Yo, cant understand the command");
  }
};

const getSizeOfDir = (dir: Tree): number => {
  return dir.files.reduce((p: number, c: File) => {
    return p + c.size;
  }, 0);
};

/**
 * 
 * 
 tree = {
  current: '/',
  children: [{
    current: 'a',
    children: [{
       current: 'e',
       children: []
    }]
  },{
    current: 'b',
    children: []
  }]
};
stack:
  / --> a --> e (0)
  / --> a (1 + 0)
  / --> b (1)
  / (1 + 1)
 * 
 */
const processSizeOfDir = (directory: Tree): number => {
  if (!directory.children.length) {
    return getSizeOfDir(directory);
  }

  let parentSize: number = 0;
  directory.children.forEach((dir) => {
    const size = processSizeOfDir(dir);
    dir.size = size;
    parentSize += size;
  });
  parentSize = getSizeOfDir(directory) + parentSize;
  directory.size = parentSize;

  return parentSize;
};

const findDirectoriesWithinLimit = (directory: Tree, limit: number) => {
  if (!directory.children.length) {
    if (directory.size < limit) {
      return directory.size;
    } else {
      return 0;
    }
  }

  let result = 0;
  directory.children.forEach((dir) => {
    if (dir.size < limit) {
      const size = findDirectoriesWithinLimit(dir, limit);
      result += size;
    }
  });

  if (directory.size < limit) {
    result += directory.size;
  }

  return result;
};

const part1 = (data: string[]) => {
  // let dirs: Tree[] = [];
  // const sizeOfDir: { [key: string]: number } = {};
  const limit = 100000;

  data.forEach((line) => {
    const commands = line.split(" ");
    const iSCommand = "$" === commands[0];
    if (iSCommand) {
      parseCommand(commands[1], commands[2]);
      return;
    }
    createTree(commands[0], commands[1]);
  });

  processSizeOfDir(tree);
  console.table(stringifyCircularJson(tree));

  return `Sum of dir of size less then ${limit} is: ${findDirectoriesWithinLimit(tree, limit)}`;
};

const part2 = (data: string[]) => {
  return `Crate top of each stack: `;
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
