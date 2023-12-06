import { readPuzzle } from './readPuzzle';

function getWins(numbers: string): number {
  const winningNumbers: Set<number> = new Set();
  const elfNumbers: number[] = [];

  let i = -2;
  // stupidest thing ever
  while ((i += 3)) {
    if (numbers[i] === '|') break;
    winningNumbers.add(Number(numbers[i] + numbers[i + 1]));
  }

  for (i = i + 2; i < numbers.length; i = i + 3) {
    elfNumbers.push(Number(numbers[i] + numbers[i + 1]));
  }

  let wins = 0;
  for (let num of elfNumbers) {
    if (winningNumbers.has(num)) {
      wins++;
    }
  }
  return wins;
}

function calculatePoints(wins: number): number {
  return wins > 0 ? 1 << (wins - 1) : 0;
}

function part1(input: string) {
  let totalPoints = 0;
  for (let line of input.split('\n')) {
    if (line == '') break;
    let [_, numbers] = line.split(':');
    const wins = getWins(numbers);
    totalPoints += calculatePoints(wins);
  }
  return totalPoints;
}

function part2(input: string) {
  let length = 0;
  for (let line of input.split('\n')) {
    if (line == '') break;
    length++;
  }
  let scratchcards = new Array(length).fill(1);
  let pos = 0;
  for (let line of input.split('\n')) {
    if (line == '') break;
    let [_, numbers] = line.split(':');
    const wins = getWins(numbers);
    for (let i = pos + 1; i < Math.min(pos + 1 + wins, length); i++) {
      scratchcards[i] = scratchcards[pos] + scratchcards[i];
    }
    pos++;
  }
  return scratchcards.reduce((acc, curr) => acc + curr, 0);
}

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const input = readPuzzle('day4');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
// console.log('part 2', part2(example));
