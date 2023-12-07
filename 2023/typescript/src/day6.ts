function getTimesAndDistances(input: string): [number[], number[]] {
  const [timeRow, distanceRow] = input.split('\n');

  function parseColumns(row: string) {
    const nums = row.split(':')[1];
    let num = '';
    const numbers: number[] = [];
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === ' ') {
        if (num === '') continue;
        else {
          numbers.push(Number(num));
          num = '';
          continue;
        }
      }
      num += nums[i];
    }
    if (num != '') numbers.push(Number(num));
    return numbers;
  }

  return [parseColumns(timeRow), parseColumns(distanceRow)];
}

function getTimeAndDistance(input: string): [number, number] {
  const [timeRow, distanceRow] = input.split('\n');

  function parseColumns(row: string) {
    const nums = row.split(':')[1];
    let num = '';
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] === ' ') {
        continue;
      }
      num += nums[i];
    }
    return Number(num);
  }

  return [parseColumns(timeRow), parseColumns(distanceRow)];
}

function part1(input: string) {
  const [times, distances] = getTimesAndDistances(input);
  let winsProduct = 1;
  for (let i = 0; i < times.length; i++) {
    const record = distances[i];
    let wins = 0;
    for (let j = 1; j < times[i]; j++) {
      const time = times[i];
      const distance = (time - j) * j;
      if (distance > record) wins++;
    }
    winsProduct *= wins;
  }
  return winsProduct;
}

function part2(input: string) {
  const [time, record] = getTimeAndDistance(input);
  let wins = 0;
  for (let i = 1; i < time; i++) {
    const distance = (time - i) * i;
    if (distance > record) wins++;
  }
  return wins;
}

const example = `Time:      7  15   30
Distance:  9  40  200`;

const input = `Time:        59     79     65     75
Distance:   597   1234   1032   1328`;

console.log('part 1', part1(input));
console.log('part 2', part2(input));
