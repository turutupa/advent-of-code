import { readPuzzle } from './readPuzzle';

const GALAXY = '#';

function freeRowsAndColumns(lines: string[]): number[][] {
  const rows: number[] = [];
  const cols: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    let freeRow = true;
    let freeCol = true;
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === GALAXY) freeRow = false;
      if (lines[j][i] === GALAXY) freeCol = false;
      if (!freeRow && !freeCol) break;
    }
    if (freeRow) rows.push(i);
    if (freeCol) cols.push(i);
  }
  return [rows, cols];
}

function expandRows(lines: string[], rows: number[]) {
  let offset = 0;
  for (let row of rows) {
    const newRow: string = '.'.repeat(lines[0].length);
    const pre = lines.slice(0, row + offset);
    const post = lines.slice(row + offset);
    lines = [...pre, newRow, ...post];
    offset++;
  }
  return lines;
}

function expandCols(lines: string[], cols: number[]) {
  let offset = 0;
  for (let col of cols) {
    for (let i = 0; i < lines.length; i++) {
      const pre = lines[i].slice(0, col + offset);
      const post = lines[i].slice(col + offset);
      lines[i] = pre + '.' + post;
    }
    offset++;
  }
  return lines;
}

type Coordinates = [number, number];

function getGalaxyCoordinates(lines: string[]): Coordinates[] {
  const coordinates: Coordinates[] = [];

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === GALAXY) coordinates.push([i, j]);
    }
  }
  return coordinates;
}

type Pair = [Coordinates, Coordinates];

function getPairs(galaxies: Coordinates[]): Pair[] {
  const pairs: Pair[] = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      pairs.push([galaxies[i], galaxies[j]]);
    }
  }
  return pairs;
}

function getShortestPath(
  pair: [Coordinates, Coordinates],
  rows?: number[],
  cols?: number[],
): number {
  const [[fromX, fromY], [toX, toY]] = pair;
  let distanceX = Math.abs(fromX - toX);
  let distanceY = Math.abs(fromY - toY);

  if (rows && cols) {
    for (let row of rows) {
      const coords = [fromX, toX].sort();
      if (row >= coords[0] && row <= coords[1]) {
        distanceX += EXPANSION_RATE - 1;
      }
    }
    for (let col of cols) {
      const coords = [fromY, toY].sort();
      if (col >= coords[0] && col <= coords[1]) {
        distanceX += EXPANSION_RATE - 1;
      }
    }
  }
  return distanceX + distanceY;
}

function part1(input: string) {
  let lines = input.split('\n');
  const [rows, cols]: number[][] = freeRowsAndColumns(lines);
  lines = expandRows(lines, rows);
  lines = expandCols(lines, cols);
  const galaxies: Coordinates[] = getGalaxyCoordinates(lines);
  const pairs: Pair[] = getPairs(galaxies);
  let sum: number = 0;
  for (let pair of pairs) {
    sum += getShortestPath(pair);
  }
  return sum;
}

// const EXPANSION_RATE = 100;
const EXPANSION_RATE = 1000000;

function part2(input: string) {
  let lines = input.split('\n');
  const [rows, cols] = freeRowsAndColumns(lines);
  const galaxies = getGalaxyCoordinates(lines);
  const pairs = getPairs(galaxies);
  let sum = 0;
  for (let pair of pairs) {
    sum += getShortestPath(pair, rows, cols);
  }
  return sum;
}

const test = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const input = readPuzzle('day11');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
