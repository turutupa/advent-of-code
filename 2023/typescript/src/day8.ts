import { readPuzzle } from './readPuzzle';

type Adjacency = Record<string, string[]>;

const createAdjacencyList = (lines: string[]): Adjacency => {
  const adjacency: Adjacency = {};
  for (let line of lines) {
    // if (line === '') continue;
    const key = line.split('=')[0].trim();
    const branches = line
      .split('=')[1]
      .trim()
      .replace(')', '')
      .replace('(', '')
      .split(',')
      .map((x) => x.trim());
    adjacency[key] = branches;
  }
  return adjacency;
};

const START = 'AAA';
const FINISH = 'ZZZ';
const RIGHT = 'R';

function* traverse(
  adjacency: Adjacency,
  lookupOrder: string,
  currentNode: string = START,
  lookupIdx: number = 0,
  counter: number = 0,
  indefinitely: boolean = false,
): Generator<string, number, unknown> {
  let next;
  let i = 0;
  while (true) {
    if (!indefinitely && currentNode === FINISH) return counter;
    if (lookupIdx >= lookupOrder.length) lookupIdx = 0;
    next = lookupOrder[lookupIdx] === RIGHT ? 1 : 0;
    currentNode = adjacency[currentNode][next];
    lookupIdx++;
    counter++;
    i++;
    yield currentNode;
  }
}

function part1(input: string): number {
  const lines = input.split('\n');
  const lookupOrder: string = lines.shift()!.trim();
  lines.shift();
  const adjacency = createAdjacencyList(lines);
  const steps = traverse(adjacency, lookupOrder);
  let result;
  do {
    result = steps.next();
  } while (!result.done);
  return result.value;
}

function getStartingNodes(adjacency: Adjacency): string[] {
  const nodes = [];
  for (let node of Object.keys(adjacency)) {
    if (node[2] === 'A') nodes.push(node);
  }

  return nodes;
}

function endsInZ(node: string): boolean {
  return node[2] === 'Z';
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function arrayLCM(numbers: number[]): number {
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }
  return result;
}

function part2(input: string): number {
  const lines = input.split('\n');
  const lookupOrder: string = lines.shift()!.trim();
  lines.shift();
  const adjacency = createAdjacencyList(lines);
  let nodes = getStartingNodes(adjacency);
  let steps = 0;
  let lookupIdx = 0;
  let next: number;
  const nodeSteps: number[] = [];
  while (nodes.length) {
    if (lookupIdx >= lookupOrder.length) lookupIdx = 0;
    next = lookupOrder[lookupIdx] === RIGHT ? 1 : 0;
    nodes = nodes.map((n) => adjacency[n][next]);
    lookupIdx++;
    steps++;
    nodes = nodes.filter((n) => {
      if (endsInZ(n)) {
        nodeSteps.push(steps);
        return false;
      }
      return true;
    });
  }
  return arrayLCM(nodeSteps);
}

const test_a = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const test_b = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const input = readPuzzle('day8');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
