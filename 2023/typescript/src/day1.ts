import * as fs from 'fs';

function part1() {
  const filepath = './../inputs/day1.txt';
  const input = fs.readFileSync(filepath, 'utf8');

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

function part2() {
  const filepath = './../inputs/day1.txt';
  const input = fs.readFileSync(filepath, 'utf8');

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
            console.log(line, num);
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

// console.log(part1())
console.log(part2());
