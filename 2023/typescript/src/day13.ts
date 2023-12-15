import { readPuzzle } from './readPuzzle';

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

function getVerticalLineReflections(mirror: string[], index: number, mirrorIdx: number): number {
  for (let i = 0; i < mirror.length; i++) {
    for (let j = 0; j < index; j++) {
      const left = mirror[i][j];
      const right = mirror[i][2 * index - j - 1];
      if (!left || !right) continue;
      if (left != right) return 0;
    }
  }
  cache[mirrorIdx].vertical.add(index);
  return index;
}

function getHorizontalLineReflections(mirror: string[], index: number, mirrorIdx: number): number {
  // method 1
  // alternative way - just using the transposed matrix
  // const transposed = transposeMatrix(mirror.map((line) => line.split(''))).map((line) =>
  //   line.join(''),
  // );
  // return getVerticalLineReflections(transposed, index);
  // method 2
  for (let i = 0; i < index; i++) {
    for (let j = 0; j < mirror[0].length; j++) {
      const up = mirror[i][j];
      const reflected = mirror[2 * index - i - 1];
      if (!reflected) break;
      const down = reflected[j];
      if (up != down) return 0;
    }
  }
  cache[mirrorIdx].horizontal.add(index);
  return index;
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

type Reflections = {
  vertical: Set<number>;
  horizontal: Set<number>;
};

const COEFFICIENT = 100;
let cache: Reflections[];

function part1(input: string) {
  cache = new Array(input.length).fill({
    vertical: new Set(),
    horizontal: new Set(),
  });
  const lines: string[] = input.split('\n');
  let reflections = 0;
  let counter = 0;
  for (let mirror of getMirrors(lines)) {
    for (let i = 0; i < mirror[0]?.length; i++) {
      reflections += getVerticalLineReflections(mirror, i, counter);
    }
    for (let i = 0; i < mirror?.length; i++) {
      reflections += COEFFICIENT * getHorizontalLineReflections(mirror, i, counter);
    }
    counter++;
  }
  return reflections;
}

function fix(mirror: string[], mirrorIdx: number): number {
  const tmp: string[][] = [...mirror].map((line) => line.split(''));
  let reflections = 0;
  for (let i = 0; i < tmp.length; i++) {
    for (let j = 0; i < tmp[0].length; j++) {
      const original = tmp[i][j];
      const replacement = original === '#' ? '.' : '#';
      tmp[i][j] = replacement;

      const mirror = tmp.map((x) => x.join(''));
      for (let k = 0; k < tmp[0].length; k++) {
        if (cache[mirrorIdx].vertical.has(k)) continue;
        reflections += getVerticalLineReflections(mirror, k, mirrorIdx);
        // if (reflections > 0) {
        // console.log('coords', [i, j], 'vertical reflection line', k);
        // console.log(tmp.map((x) => x.join('')));
        // return reflections;
        // }
      }

      for (let k = 0; k < tmp.length; k++) {
        if (cache[mirrorIdx].horizontal.has(k)) continue;
        reflections += COEFFICIENT * getHorizontalLineReflections(mirror, k, mirrorIdx);
        // if (reflections > 0) {
        // console.log('coords', [i, j], 'horizontal reflection line', k);
        // console.log(tmp.map((x) => x.join('')));
        // return reflections;
        // }
      }

      if (reflections > 0) return reflections;

      tmp[i][j] = original;
    }
  }
  return reflections;
}

function part2(input: string) {
  const lines: string[] = input.split('\n');
  let reflections = 0;
  let counter = 0;
  for (let mirror of getMirrors(lines)) {
    reflections += fix(mirror, counter);
    counter++;
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

// console.log('[test] part 1', part1(test));
// console.log('[test] part 2', part2(test));

const input = readPuzzle('day13');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
