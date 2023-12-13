#!/bin/bash

# Get the day argument
day=$1

# Check if the day argument is provided
if [ -z "$day" ]; then
  echo "Error: Please provide a day number."
  exit 1
fi

# Run the TypeScript file with watch mode
node --watch -r ts-node/register "./src/day${day}.ts"
