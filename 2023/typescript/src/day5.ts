import { readPuzzle } from './readPuzzle';

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
      if (element == 79) {
        console.log();
        console.log('element', element);
        console.log('source', source);
        console.log('destination', destination);
        console.log('range', range);
        console.log('diff', diff);
        console.log('adjusted destination', destination + diff);
        console.log();
      }
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
  const seeds: number[] = lines
    .shift()!
    .split(':')[1]
    .trim()
    .split(' ')
    .map((x) => Number(x));

  // remove blank line
  lines.shift();
  lines.shift(); // seed-to-soil map:

  const seedToSoil = {};
  let line = lines.shift();
  while (line) {
    const [destination, source, range] = parse(line);
    map(seeds, seedToSoil, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(seeds, seedToSoil);
  line = lines.shift();

  console.log('seed to soil', seedToSoil);

  const soilToFertilizer = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(seedToSoil), soilToFertilizer, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(seedToSoil), soilToFertilizer);
  line = lines.shift();

  console.log('soil to fertilizer', soilToFertilizer);

  const fertilizerToWater = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(soilToFertilizer), fertilizerToWater, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(soilToFertilizer), fertilizerToWater);
  line = lines.shift();

  console.log('fertilizer to water', fertilizerToWater);

  const waterToLight = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(fertilizerToWater), waterToLight, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(fertilizerToWater), waterToLight);
  line = lines.shift();

  console.log('water to light', waterToLight);

  const lightToTemperature = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(waterToLight), lightToTemperature, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(waterToLight), lightToTemperature);
  line = lines.shift();

  console.log('light to temperature', lightToTemperature);

  const temperatureToHumidity = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(lightToTemperature), temperatureToHumidity, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(lightToTemperature), temperatureToHumidity);
  line = lines.shift();

  console.log('temperature to humidity', temperatureToHumidity);

  const humidityToLocation = {};
  while (line) {
    const [destination, source, range] = parse(line);
    map(Object.values(temperatureToHumidity), humidityToLocation, source, destination, range);
    line = lines.shift();
  }
  mapMissingElements(Object.values(temperatureToHumidity), humidityToLocation);
  line = lines.shift();

  console.log('humidity to location', humidityToLocation);

  const location: number[] = Object.values(humidityToLocation);
  return Math.min(...location);
}

function part2(input: string) {}

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

console.log('part 1 - test', part1(test));

const input = readPuzzle('day5');
console.log('part 1', part1(input)); // solution: 51580674
// console.log('part 2', part2(input));
