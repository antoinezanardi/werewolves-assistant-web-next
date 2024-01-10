#!/bin/bash
PS3="What kind of job are your starting ? "
select option in "feat" "fix" "docs" "style" "refactor" "test" "perf" "build" "ci" "chore" "revert";
do
  case $option in
  feat | fix | docs | style | refactor | test | perf | build | ci | chore | revert)
    SELECTED_OPTION=$option
    break
    ;;
  *)
    echo "❌  Invalid option: \"$REPLY\". Please choose between 1 to 11."
    ;;
  esac
done

while true; do
  echo "Please provide your branch name, it must be kebab-case (like: 'my-feature') : "
  read -r FEATURE_NAME
  if [[ -z "$FEATURE_NAME" ]]; then
    echo "You must provide a branch name."
    continue
  fi
  if ! [[ "$FEATURE_NAME" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
    echo "❌  Your branch name must be in kebab-case."
    continue
  fi
  break
done

BRANCH_NAME="$SELECTED_OPTION/$FEATURE_NAME"
git checkout -b "$BRANCH_NAME"
echo "You're all set 🚀"
