#!/bin/bash
output=$(cat)

tests_count=$(echo "$output" | grep 'Tests' | awk -F'[()]' '{print $2}')

statements_count=$(echo "$output" | awk '/Statements/{print $(NF-1)}')
branches_count=$(echo "$output" | awk '/Branches/{print $(NF-1)}')
functions_count=$(echo "$output" | awk '/Functions/{print $(NF-1)}')
lines_count=$(echo "$output" | awk '/Lines +:/{print $(NF-1)}' | tr -d '\Lines +')

statements_percent=$(echo "$output" | awk '/Statements/{print $3}')
branches_percent=$(echo "$output" | awk '/Branches/{print $3}')
functions_percent=$(echo "$output" | awk '/Functions/{print $3}')
lines_percent=$(echo "$output" | awk '/Lines +:/{print $3}' | tr -d '\Lines +:')

echo "VITEST_TESTS_COUNT=$tests_count"

echo "VITEST_STATEMENTS_COUNT=$statements_count"
echo "VITEST_BRANCHES_COUNT=$branches_count"
echo "VITEST_FUNCTIONS_COUNT=$functions_count"
echo "VITEST_LINES_COUNT=$lines_count"

echo "VITEST_STATEMENTS_PERCENT=$statements_percent"
echo "VITEST_BRANCHES_PERCENT=$branches_percent"
echo "VITEST_FUNCTIONS_PERCENT=$functions_percent"
echo "VITEST_LINES_PERCENT=$lines_percent"