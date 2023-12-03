import { readPuzzle } from './readPuzzle';

const red = 'red';
const blue = 'blue';
const green = 'green';

type Color = typeof red | typeof blue | typeof green;

type Bag = {
  red: number;
  green: number;
  blue: number;
};

const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
};

function part1(input: string) {
  let idsSum = 0;
  const colors = new Set([red, blue, green]);

  for (let line of input.split('\n')) {
    if (line === '') break;
    const separate = line.split(':');
    const id = Number(separate[0].split(' ')[1].replace(':', ''));

    const games = separate[1].split(';');
    const counter: Map<Color, number> = new Map<Color, number>();

    for (let game of games) {
      const regex = new RegExp(',', 'g');
      const columns = game.replace(regex, '').split(' ');
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i] as Color;
        if (colors.has(column)) {
          // console.log('id:', id, 'color:', Number(columns[i - 1]), column);
          counter.set(column, Math.max(counter.get(column) ?? 0, Number(columns[i - 1])));
        }
      }
    }

    if (
      counter.has(red) &&
      counter.get(red)! <= bag[red] &&
      counter.has(blue) &&
      counter.get(blue)! <= bag[blue] &&
      counter.has(green) &&
      counter.get(green)! <= bag[green]
    ) {
      idsSum += id;
    }
  }

  return idsSum;
}

function part2(input: string) {
  let setsSum = 0;
  const colors = new Set([red, blue, green]);

  for (let line of input.split('\n')) {
    if (line === '') break;
    const separate = line.split(':');

    const games = separate[1].split(';');
    const counter: Map<Color, number> = new Map<Color, number>();

    for (let game of games) {
      const regex = new RegExp(',', 'g');
      const columns = game.replace(regex, '').split(' ');
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i] as Color;
        if (colors.has(column)) {
          counter.set(column, Math.max(counter.get(column) ?? 0, Number(columns[i - 1])));
        }
      }
    }

    let powerSet = counter.get(red)! * counter.get(green)! * counter.get(blue)!;
    setsSum += powerSet;
  }

  return setsSum;
}

const input: string = readPuzzle('day2');
console.log('part 1', part1(input));
console.log('part 2', part2(input));
