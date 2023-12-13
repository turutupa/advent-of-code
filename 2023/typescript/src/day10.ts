import { readPuzzle } from './readPuzzle';

type Coordinates = [number, number];

type Pipe = [number, number];

type Pipes = Record<string, Pipe[]>;

const pipes: Pipes = {
  '|': [
    [0, 1],
    [0, -1],
  ],
  '-': [
    [-1, 0],
    [1, 0],
  ],
  L: [
    [0, -1],
    [1, 0],
  ],
  J: [
    [0, -1],
    [-1, 0],
  ],
  '7': [
    [-1, 0],
    [0, 1],
  ],
  F: [
    [1, 0],
    [0, 1],
  ],
  '.': [],
  S: [],
};

function getStartingPoint(lines: string[]): Coordinates {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 'S') return [i, j];
    }
  }
  return [-1, -1];
}

function isConnected(source: Pipe, numbertarget: Pipe): boolean {
  return true;
}

function part1(input: string) {
  const lines = input.split('\n');
  const startingPoint = getStartingPoint(lines);
  console.log('starting point', startingPoint);
}

function part2(input: string) {}

const test = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const input = readPuzzle('day10');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
