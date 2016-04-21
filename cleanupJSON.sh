#!/bin/bash
#source ~/.zshrc
set -e
if [[ $# -ne 0 ]]; then
  echo "usage $0 (run with JSON to cleanup in in clipboard)"
  exit 1;
fi

pbpaste | node /Users/aaronbrady1/dev/scripts/cleanupJSON.js | pbcopy

