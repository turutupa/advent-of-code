import { readPuzzle } from './readPuzzle';
import { replaceCharAtIndex } from './helpers';

const OPERATIONAL = '.';
const DAMAGED = '#';
const UNKNOWN = '?';

function areArraysEqual(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function countGroups(springs: string): number[] {
  let groups: number[] = [];
  let group: number = 0;
  for (let i = 0; i < springs.length; i++) {
    if (springs[i] === '#') group++;
    else if (springs[i] === '?') return groups;
    else {
      group > 0 && groups.push(group);
      group = 0;
    }
  }
  group > 0 && groups.push(group);
  return groups;
}

function isSubarr(subarr: number[], arr: number[]): boolean {
  for (let i = 0; i < subarr.length; i++) {
    if (subarr[i] != arr[i]) return false;
  }
  return true;
}

function sum(groups: number[]): number {
  let sum = 0;
  for (let num of groups) {
    sum += num;
  }
  return sum;
}

function getPermutations(line: string): number {
  // if (line === '') return 0;
  const [springs, groupsStr] = line.split(' ');
  let groups: number[] = [];
  if (groupsStr.indexOf(',') >= 0) {
    groups = groupsStr.split(',').map((x) => Number(x));
  } else {
    groups = [Number(groupsStr)];
  }

  let arrangements = 0;

  const memo = new Set();
  const groupsSize = sum(groups);

  function backtrack(idx: number, springs: string) {
    if (springs.length < groupsSize) return;
    if (memo.has(springs)) return;
    const currentGroups = countGroups(springs);
    if (!isSubarr(currentGroups, groups)) return;
    if (idx >= springs.length) {
      if (areArraysEqual(currentGroups, groups)) {
        arrangements++;
      }
      return;
    }
    if (springs[idx] === UNKNOWN) {
      backtrack(idx + 1, replaceCharAtIndex(springs, idx, OPERATIONAL));
      backtrack(idx + 1, replaceCharAtIndex(springs, idx, DAMAGED));
    } else {
      backtrack(idx + 1, springs);
    }
    memo.add(springs);
  }

  backtrack(0, springs);

  return arrangements;
}

function part1(input: string) {
  const lines = input.split('\n');
  let arrangements = 0;
  for (let line of lines) {
    const permutations = getPermutations(line);
    arrangements += permutations;
  }
  return arrangements;
}

const NUM_COPIES = 2;

function unfold(line: string) {
  const [springs, groups] = line.split(' ');
  let unfoldedSprings = springs;
  let unfoldedGroups = groups;
  for (let i = 0; i < NUM_COPIES - 1; i++) {
    unfoldedSprings += '?' + springs;
    unfoldedGroups += ',' + groups;
  }
  return unfoldedSprings + ' ' + unfoldedGroups;
}

function part2(input: string) {
  const lines = input.split('\n');
  let arrangements = 0;
  for (let line of lines) {
    const unfolded = unfold(line);
    const permutations = getPermutations(unfolded);
    arrangements += permutations;
  }
  return arrangements;
}

const test = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const input = readPuzzle('day12');
// console.log('part 1', part1(input));
console.log('part 2', part2(input));
