import { readPuzzle } from './readPuzzle';

function parse(line: string): number[] {
  return line.split(' ').map((x) => Number(x));
}

function getSequence(nums: number[]): number[] {
  const sequence = [];
  for (let i = 1; i < nums.length; i++) {
    sequence.push(nums[i] - nums[i - 1]);
  }
  return sequence;
}

function part1(input: string) {
  const lines = input.split('\n');
  let historySum = 0;
  for (let line of lines) {
    const sequences: number[][] = [parse(line)];
    while (!sequences[sequences.length - 1].every((num) => num === 0)) {
      const last = sequences.length - 1;
      const sequence = getSequence(sequences[last]);
      sequences.push(sequence);
    }

    if (sequences.length === 1) continue;
    sequences[sequences.length - 1].push(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
      const currLast = sequences[i][sequences[i].length - 1];
      const prevLast = sequences[i + 1][sequences[i + 1].length - 1];
      sequences[i].push(currLast + prevLast!);
    }
    historySum += sequences[0][sequences[0].length - 1];
  }
  return historySum;
}

function part2(input: string) {
  const lines = input.split('\n');
  let historySum = 0;
  for (let line of lines) {
    const sequences: number[][] = [parse(line)];
    while (!sequences[sequences.length - 1].every((num) => num === 0)) {
      const last = sequences.length - 1;
      const sequence = getSequence(sequences[last]);
      sequences.push(sequence);
    }

    if (sequences.length === 1) continue;
    sequences[sequences.length - 1].unshift(0);
    for (let i = sequences.length - 2; i >= 0; i--) {
      const currFirst = sequences[i][0];
      const prevFirst = sequences[i + 1][0];
      sequences[i].unshift(currFirst - prevFirst);
    }
    historySum += sequences[0][0];
  }
  return historySum;
}

const test = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const input = readPuzzle('day9');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
