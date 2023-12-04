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

function traverse(input: string) {
  for (let line of input.split('\n')) {
    if (line == '') break;
    let [_, numbers] = line.split(':');
    const wins = getWins(numbers);
    totalPoints += wins > 0 ? 1 << (wins - 1) : 0;
  }
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
  let totalPoints = 0;
  return totalPoints;
}

const input = readPuzzle('day4');
console.log(part1(input));
console.log(part2(input));
