#!/bin/bash

repo="antoinezanardi/werewolves-assistant-web-next"
workflow_name="📑 Deploy Reports to GitHub Pages"
attempts=30
interval_seconds=20

in_progress_run_number_to_check="$1"

for ((i = 1; i <= attempts; i++)); do
  queued_runs=$(gh run list -R "$repo" -w "$workflow_name" --json status -s "queued" --limit 1 | jq ". | length")

  if [ "$queued_runs" -eq 1 ]; then
    echo "🕘 Found queued run. Waiting for $interval_seconds seconds before the next attempt ($i/$attempts)."
    sleep $interval_seconds
  else
    least_recent_in_progress_run_number=$(gh run list -R "$repo" -w "$workflow_name" --json number -s "in_progress" --limit 2 | jq ". | last | .number")

    if [ "$least_recent_in_progress_run_number" = "null" ]; then
      echo "✅ No active runs found. Exiting with code 0."
      exit 0
    elif [ "$least_recent_in_progress_run_number" -eq "$in_progress_run_number_to_check" ]; then
      echo "✅ This run is first in queue. Exiting with code 0."
      exit 0
    else
      echo "🕘 Found in progress run with a different ID (Current: $in_progress_run_number_to_check !== Actual: $least_recent_in_progress_run_number). Waiting for $interval_seconds seconds before the next attempt ($i/$attempts)."
      sleep $interval_seconds
    fi
  fi
done

echo "Exceeded $attempts attempts. Exiting with code 1."
exit 1