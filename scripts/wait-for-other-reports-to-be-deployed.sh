#!/bin/bash

repo="antoinezanardi/werewolves-assistant-web-next"
workflow_name="📑 Deploy Reports to GitHub Pages"
attempts=15
interval_seconds=15

for ((i = 1; i <= $attempts; i++)); do
  runs=$(gh run list -R "$repo" -w "$workflow_name" --json status -s "in_progress" --limit 2 | jq ". | length")

  if [ "$runs" -le 1 ]; then
    echo "✅ Found one active run (this run itself). Exiting with code 0."
    exit 0
  elif [ "$runs" -eq 0 ]; then
    echo "✅ No active runs found. Exiting with code 0."
    exit 0
  else
    echo "🕘 Found $runs active runs. Waiting for $interval_seconds seconds before the next attempt ($i/$attempts)."
    sleep $interval_seconds
  fi
done

echo "Exceeded $attempts attempts. Exiting with code 1."
exit 1