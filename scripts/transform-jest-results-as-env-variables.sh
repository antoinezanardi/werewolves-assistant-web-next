#!/bin/bash
output=$(cat)

tests_count=$(echo "$output" | awk '/Tests:/{print $2}')

statements_count=$(echo "$output" | awk '/Statements/{print $(NF-1)}')
branches_count=$(echo "$output" | awk '/Branches/{print $(NF-1)}')
functions_count=$(echo "$output" | awk '/Functions/{print $(NF-1)}')
lines_count=$(echo "$output" | awk '/Lines/{print $(NF-1)}' | tr -d '\nLine')

statements_percent=$(echo "$output" | awk '/Statements/{print $3}')
branches_percent=$(echo "$output" | awk '/Branches/{print $3}')
functions_percent=$(echo "$output" | awk '/Functions/{print $3}')
lines_percent=$(echo "$output" | awk '/Lines/{print $3}' | tr -d '\nLine')

echo "JEST_TESTS_COUNT=$tests_count"

echo "JEST_STATEMENTS_COUNT=$statements_count"
echo "JEST_BRANCHES_COUNT=$branches_count"
echo "JEST_FUNCTIONS_COUNT=$functions_count"
echo "JEST_LINES_COUNT=$lines_count"

echo "JEST_STATEMENTS_PERCENT=$statements_percent"
echo "JEST_BRANCHES_PERCENT=$branches_percent"
echo "JEST_FUNCTIONS_PERCENT=$functions_percent"
echo "JEST_LINES_PERCENT=\"${lines_percent:1}\""