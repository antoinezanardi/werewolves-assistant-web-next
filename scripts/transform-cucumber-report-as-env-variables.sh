#!/bin/bash

report_file="tests/acceptance/reports/junit.xml"

num_testcases=$(grep -c "<testcase" "$report_file")

echo "CUCUMBER_SCENARIOS_COUNT=$num_testcases"