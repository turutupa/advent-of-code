import { readPuzzle } from './readPuzzle';

const ROCK = 'O';
const SPACE = '.';

function rollRocks(matrix: string[][]) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === ROCK) {
        tiltNorth(matrix, i, j);
      }
    }
  }
}

function tiltNorth(matrix: string[][], x: number, y: number): void {
  for (let i = x; i > 0; i--) {
    const nextItem = matrix[i - 1][y];
    if (nextItem === SPACE) {
      matrix[i - 1][y] = ROCK;
      matrix[i][y] = SPACE;
    } else {
      return;
    }
  }
}

function sumLoads(matrix: string[][]): number {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === ROCK) {
        sum += matrix.length - i;
      }
    }
  }
  return sum;
}

function part1(input: string) {
  const matrix = input.split('\n').map((x) => x.split(''));
  rollRocks(matrix);
  return sumLoads(matrix);
}

const CYCLES = 1000000000;

function part2(input: string) {
  let matrix = input.split('\n').map((x) => x.split(''));
  // for (let k = 0; k < CYCLES / 4; k++) {
  //   rollRocks(matrix);
  //   matrix = rotateMatrix(matrix);
  // }
  return sumLoads(matrix);
}

const test = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

console.log('[test] part 1', part1(test));
console.log('[test] part 2', part2(test));

const input = readPuzzle('day14');
console.log('part 1', part1(input));
// console.log('part 2', part2(test));
