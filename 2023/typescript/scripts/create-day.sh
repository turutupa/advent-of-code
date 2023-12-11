#!/bin/bash

# Get the day argument.sh
day=$1

# Check if the day argument is provided
if [ -z "$day" ]; then
  echo "Error: Please provide a day number."
  exit 1
fi

# Load environment variables from .env file
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Create the src directory if it doesn't exist
mkdir -p ./src

# Generate the file path
file_path="./src/day${day}.ts"

# Check if the file already exists
if [ -e "$file_path" ]; then
  echo "Error: File already exists at $file_path."
  exit 1
fi

# Create the file and populate it with the template
echo "import { readPuzzle } from './readPuzzle';" >> "$file_path"
echo "" >> "$file_path"
echo "function part1(input: string) {}" >> "$file_path"
echo "" >> "$file_path"
echo "function part2(input: string) {}" >> "$file_path"
echo "" >> "$file_path"
echo "const test = \`\`;" >> "$file_path"
echo "" >> "$file_path"
echo "const input = readPuzzle('day${day}');" >> "$file_path"
echo "console.log('part 1', part1(test));" >> "$file_path"
echo "console.log('part 2', part2(test));" >> "$file_path"

echo "File created successfully at $file_path with template."

# Check if the Advent of Code session cookie is set
if [ -z "$AOC_SESSION_COOKIE" ]; then
  echo "Error: Please set the Advent of Code session cookie in the .env file (AOC_SESSION_COOKIE)."
  exit 1
fi

# Download the input file to '../inputs'
inputs_dir="../inputs"
mkdir -p "$inputs_dir"
input_url="https://adventofcode.com/2023/day/${day}/input"
curl -s --cookie "session=$AOC_SESSION_COOKIE" "$input_url" > "${inputs_dir}/day${day}.txt"

echo "Input file for ${day} downloaded to $inputs_dir."
