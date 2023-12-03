import * as fs from 'fs';
import { readPuzzle } from './readPuzzle';

function part1(input: string) {
  let total = 0;
  for (let line of input.split('\n')) {
    let first = undefined;
    let last = undefined;
    for (let char of line) {
      const num = parseInt(char);
      if (!isNaN(Number(num))) {
        if (first === undefined) {
          first = num;
        }
        last = num;
      }
    }

    if (first === undefined) continue;
    const num = parseInt(String(first) + String(last ?? first));
    total = total + num;
  }

  return total;
}

function part2(input: string) {
  const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  let total = 0;
  for (const line of input.split('\n')) {
    let first = undefined;
    let last = undefined;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const num = parseInt(char);
      if (!isNaN(Number(num))) {
        if (first === undefined) first = num;
        last = num;
      } else {
        for (let j = 0; j < numbers.length; j++) {
          const num = numbers[j];
          if (line.slice(i, i + num.length) === num) {
            if (first === undefined) first = j + 1;
            last = j + 1;
          }
        }
      }
    }

    if (first === undefined) continue;
    const num = parseInt(String(first) + String(last ?? first));

    total = total + num;
  }

  return total;
}

const input: string = readPuzzle('day1');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
