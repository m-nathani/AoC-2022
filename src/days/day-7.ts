import { readFileFromDay } from "../utils/index";

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

const changeDirectory = (arg: string) => {
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
      changeDirectory(arg);
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

const sumOfDirectoriesWithinLimit = (directory: Tree, limit: number) => {
  if (!directory.children.length) {
    if (directory.size <= limit) {
      return directory.size;
    } else {
      return 0;
    }
  }

  let result: number = 0;
  directory.children.forEach((dir: Tree) => {
    const size = sumOfDirectoriesWithinLimit(dir, limit);
    result += size;
  });

  if (directory.size <= limit) {
    result += directory.size;
  }

  return result;
};

const findDirectoryToFreeSpace = (directory: Tree, limit: number, size: number) => {
  if (!directory.children.length) {
    if (directory.size >= limit) {
      return directory.size;
    }
  }

  directory.children.forEach((dir: Tree) => {
    const currentSize = findDirectoryToFreeSpace(dir, limit, size);
    if (currentSize < size) {
      size = currentSize;
    }
  });

  if (directory.size >= limit && directory.size < size) {
    size = directory.size;
  }

  return size;
};

const part1 = () => {
  const limit = 100000;
  return `Sum of directory whose size less then ${limit} is: ${sumOfDirectoriesWithinLimit(
    tree,
    limit
  )}`;
};

const part2 = () => {
  const totalSpace = 70000000;
  const needFreeSpace = 30000000;
  const freeSpace = totalSpace - tree.size;
  const toFreeSpace = needFreeSpace - freeSpace;
  let result = 0;

  if (toFreeSpace > 0) {
    result = findDirectoryToFreeSpace(tree, toFreeSpace, tree.size);
  }

  return `Size of smallest directory that free space up is: ${result}`;
};

export default (day: string) => {
  try {
    const input: string = readFileFromDay(day);
    const data: string[] = input.split("\n");

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

    return {
      part1: part1(),
      part2: part2(),
    };
  } catch (error) {
    console.error(`Error on day ${day}: `, error);
  }
};
