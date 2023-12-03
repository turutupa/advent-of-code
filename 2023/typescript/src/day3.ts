import { readPuzzle } from './readPuzzle';

function buildMatrix(input: string) {
  const matrix: string[][] = [];
  for (const line of input.split('\n')) {
    if (line !== '') matrix.push(line.split(''));
  }
  return matrix;
}

function isNumber(str: string): boolean {
  return !isNaN(Number(str));
}

type Coordinates = [row: number, col: number];

const surroundings = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function isPartNumber(matrix: string[][], coordinates: Coordinates, gear?: string): boolean {
  const [row, col] = coordinates;
  if (!isNumber(matrix[row][col])) return false;
  for (let coords of surroundings) {
    const [x, y] = coords;
    const [i, j] = [row + x, col + y];
    if (i < 0 || i >= matrix.length) continue;
    if (j < 0 || j >= matrix[0].length) continue;
    const symbol = matrix[i][j];
    if (!isNumber(symbol) && symbol !== '.') {
      return true;
    }
  }
  return false;
}

function getAndReplaceNumber(matrix: string[][], coordinates: Coordinates): number {
  const [row, col] = coordinates;
  let num = matrix[row][col];
  matrix[row][col] = '.';

  const processAdjacent = (direction: number) => {
    let currentCol = col + direction;
    while (matrix[row][currentCol] && isNumber(matrix[row][currentCol])) {
      num = direction === -1 ? matrix[row][currentCol] + num : num + matrix[row][currentCol];
      matrix[row][currentCol] = '.';
      currentCol += direction;
    }
  };

  processAdjacent(-1);
  processAdjacent(1);

  return Number(num);
}

function part1(input: string) {
  const matrix = buildMatrix(input);
  let partNumbersSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isPartNumber(matrix, [i, j])) {
        partNumbersSum += getAndReplaceNumber(matrix, [i, j]);
      }
    }
  }
  return partNumbersSum;
}

function part2(input: string) {
  const matrix = buildMatrix(input);
  let partNumbersSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isPartNumber(matrix, [i, j])) {
        partNumbersSum += getAndReplaceNumber(matrix, [i, j]);
      }
    }
  }
  return partNumbersSum;
}

const input = readPuzzle('day3');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
