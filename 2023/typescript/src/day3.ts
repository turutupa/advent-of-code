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

function isPartNumber(matrix: string[][], coordinates: Coordinates): boolean {
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

type Action = [Coordinates, string];

class MatrixFiddler {
  private actions: Action[] = [];
  private hasHistory: boolean;

  constructor(
    private matrix: string[][],
    enableHistory?: boolean,
  ) {
    this.hasHistory = enableHistory ?? false;
  }

  getAndEraseNumber(coordinates: Coordinates): number {
    const [row, col] = coordinates;
    let num = this.matrix[row][col];
    this.matrix[row][col] = '.';
    this.hasHistory && this.actions.push([[row, col], num]);

    const processAdjacent = (direction: number) => {
      let currentCol = col + direction;
      while (this.matrix[row][currentCol] && isNumber(this.matrix[row][currentCol])) {
        const currentNum = this.matrix[row][currentCol];
        this.hasHistory && this.actions.push([[row, col], currentNum]);
        num = direction === -1 ? currentNum + num : num + currentNum;
        this.matrix[row][currentCol] = '.';
        currentCol += direction;
      }
    };

    processAdjacent(-1);
    processAdjacent(1);

    return Number(num);
  }

  undo(matrix: string[][]) {
    for (let action of this.actions) {
      const [[x, y], num] = action;
      matrix[x][y] = num;
    }
    this.actions = [];
  }
}

function getGearRatio(
  matrix: string[][],
  coordinates: Coordinates,
  matrixFiddler: MatrixFiddler,
): number {
  const [row, col] = coordinates;
  const nums: number[] = [];
  for (let coords of surroundings) {
    const [x, y] = coords;
    const [i, j] = [row + x, col + y];
    if (i < 0 || i >= matrix.length) continue;
    if (j < 0 || j >= matrix[0].length) continue;
    const symbol = matrix[i][j];
    if (isNumber(symbol)) {
      const currentNum = matrixFiddler.getAndEraseNumber([i, j]);
      nums.push(currentNum);
    }
  }
  if (nums.length == 2) {
    return nums[0] * nums[1];
  } else {
    matrixFiddler.undo(matrix);
    return 0;
  }
}

function part1(input: string) {
  const matrix = buildMatrix(input);
  const matrixFiddler = new MatrixFiddler(matrix);
  let partNumbersSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (isPartNumber(matrix, [i, j])) {
        partNumbersSum += matrixFiddler.getAndEraseNumber([i, j]);
      }
    }
  }
  return partNumbersSum;
}

const gear = '*';

function part2(input: string) {
  const matrix = buildMatrix(input);
  const matrixFiddler = new MatrixFiddler(matrix, true);
  let gearRatioSum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === gear) {
        gearRatioSum += getGearRatio(matrix, [i, j], matrixFiddler);
      }
    }
  }
  return gearRatioSum;
}

const input = readPuzzle('day3');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
