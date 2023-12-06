import { readPuzzle } from './readPuzzle';

function getSeedNumbers(lines: string[]): string {
  return lines.shift()!.split(':')[1].trim();
}

function getSeeds(lines: string[]) {
  return getSeedNumbers(lines)
    .split(' ')
    .map((x) => Number(x));
}

function getSeedPairs(lines: string[]): number[][] {
  const seeds = getSeedNumbers(lines)
    .split(' ')
    .map((x) => Number(x));
  const pairs = [];
  for (let i = 0; i < seeds.length; i = i + 2) {
    pairs.push([seeds[i], seeds[i + 1]]);
  }
  return pairs;
}

type Mapping = {
  [source: number]: number;
};

function map(
  trackedElements: number[],
  mapping: Mapping,
  source: number,
  destination: number,
  range: number,
) {
  for (let element of trackedElements) {
    if (element >= source && element <= source + range) {
      const diff = element - source;
      mapping[element] = destination + diff;
    }
  }
}

function mapMissingElements(trackedElements: number[], mapping: Mapping) {
  for (let element of trackedElements) {
    if (!mapping.hasOwnProperty(element)) {
      mapping[element] = element;
    }
  }
}

function parse(line: string) {
  return line.split(' ').map((x) => Number(x));
}

function part1(input: string) {
  const lines: string[] = input.split('\n');
  let tracked: number[] = getSeeds(lines);

  lines.shift(); // remove blank line
  lines.shift(); // seed-to-soil map:

  while (lines.length) {
    const mapping = {};
    let line = lines.shift();
    while (line) {
      const [destination, source, range] = parse(line);
      map(tracked, mapping, source, destination, range);
      line = lines.shift();
    }
    mapMissingElements(tracked, mapping);
    tracked = Object.values(mapping);
  }

  return Math.min(...tracked);
}

function part2(input: string) {
  const lines: string[] = input.split('\n');
  const pairs: number[][] = getSeedPairs(lines);
  console.log(pairs);

  lines.shift(); // remove blank line
  lines.shift(); // seed-to-soil map:

  const s: Set<number> = new Set();
  let tracked: number[] = [
    ...pairs.reduce((acc, curr) => {
      for (let i = curr[0]; i < curr[0] + curr[1]; i++) {
        acc.add(i);
      }
      return acc;
    }, s),
  ];

  console.log(tracked);

  while (lines.length) {
    const mapping = {};
    let line = lines.shift();
    while (line) {
      const [destination, source, range] = parse(line);
      map(tracked, mapping, source, destination, range);
      line = lines.shift();
    }
    mapMissingElements(tracked, mapping);
    tracked = Object.values(mapping);
  }

  return Math.min(...tracked);
}

const test = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

// console.log('part 1 - test', part1(test));
console.log('part 2 - test', part2(test));

// const input = readPuzzle('day5');
// console.log('part 1', part1(input)); // solution: 51580674
// console.log('part 2', part2(input));
