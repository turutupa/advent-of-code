export function replaceCharAtIndex(
  originalString: string,
  index: number,
  replacementChar: string,
): string {
  if (index < 0 || index >= originalString.length) {
    return originalString;
  }
  const stringArray = originalString.split('');
  stringArray[index] = replacementChar;
  const modifiedString = stringArray.join('');
  return modifiedString;
}
