import { readPuzzle } from './readPuzzle';

const cache = [];

function getMirrors(lines: string[]): string[][] {
  const mirrors: string[][] = [];
  let mirror: string[] = [];
  for (let line of lines) {
    if (!line.length) {
      if (mirror.length) {
        mirrors.push(mirror);
        mirror = [];
      }
      continue;
    }
    mirror.push(line);
  }
  if (mirror.length) mirrors.push(mirror);
  return mirrors;
}

function getVerticalLineReflections(mirror: string[], index: number): number {
  for (let i = 0; i < mirror.length; i++) {
    for (let j = 0; j < index; j++) {
      const left = mirror[i][j];
      const right = mirror[i][2 * index - j - 1];
      if (!left || !right) continue;
      if (left != right) return 0;
    }
  }
  return index;
}

function getHorizontalLineReflections(mirror: string[], index: number): number {
  // method 1
  // alternative way - just using the transposed matrix
  const transposed = transposeMatrix(mirror.map((line) => line.split(''))).map((line) =>
    line.join(''),
  );
  return getVerticalLineReflections(transposed, index);

  // method 2
  // for (let i = 0; i < index; i++) {
  //   for (let j = 0; j < mirror[0].length; j++) {
  //     const up = mirror[i][j];
  //     const reflected = mirror[2 * index - i - 1];
  //     if (!reflected) break;
  //     const down = reflected[j];
  //     if (up != down) return 0;
  //   }
  // }
  // return index;
}

function transposeMatrix(matrix: string[][]): string[][] {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const transposedMatrix: string[][] = [];
  for (let j = 0; j < columns; j++) {
    transposedMatrix[j] = [];
    for (let i = 0; i < rows; i++) {
      transposedMatrix[j][i] = matrix[i][j];
    }
  }
  return transposedMatrix;
}

const COEFFICIENT = 100;

function part1(input: string) {
  const lines: string[] = input.split('\n');
  let reflections = 0;
  for (let mirror of getMirrors(lines)) {
    for (let i = 0; i < mirror[0]?.length; i++) {
      reflections += getVerticalLineReflections(mirror, i);
    }
    for (let i = 0; i < mirror?.length; i++) {
      reflections += COEFFICIENT * getHorizontalLineReflections(mirror, i);
    }
  }
  return reflections;
}

function fix(mirror: string[]): number {
  const tmp: string[][] = [...mirror].map((line) => line.split(''));
  let reflections = 0;
  for (let i = 0; i < tmp.length; i++) {
    for (let j = 0; i < tmp[0].length; j++) {
      const original = tmp[i][j];
      const replacement = original === '#' ? '.' : '#';
      tmp[i][j] = replacement;

      const mirror = tmp.map((x) => x.join(''));
      for (let k = 0; k < tmp[0]?.length; k++) {
        reflections += getVerticalLineReflections(mirror, k);
        reflections += COEFFICIENT * getHorizontalLineReflections(mirror, k);
      }

      tmp[i][j] = original;
    }
  }
  return reflections;
}

function part2(input: string) {
  const lines: string[] = input.split('\n');
  let reflections = 0;
  for (let mirror of getMirrors(lines)) {
    reflections += fix(mirror);
  }
  return reflections;
}

const test = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const input = readPuzzle('day13');
// console.log('[test] part 1', part1(test));
console.log('part 1', part1(input));
console.log('[test] part 2', part2(test));
// console.log('part 2', part2(input));
