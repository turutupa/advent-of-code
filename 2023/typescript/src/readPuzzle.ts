import * as fs from 'fs';

export const readPuzzle = (day: string): string => {
  const filepath = `./../inputs/${day}.txt`;
  return fs.readFileSync(filepath, 'utf8');
};
