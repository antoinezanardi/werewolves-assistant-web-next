#!/bin/bash

# Ask the user to input the run ID
read -p "Please enter the GitHub Action run ID: " RUN_ID

# Check if the user provided a run ID
if [ -z "$RUN_ID" ]; then
  echo "Run ID is required."
  exit 1
fi

# Configuration
REPO_OWNER="antoinezanardi"
REPO_NAME="werewolves-assistant-web-next"
DESTINATION_DIR="tests/acceptance/screenshots/linux"

set -e

# Create destination folder if it doesn't exist
mkdir -p "$DESTINATION_DIR"

# Fetch and download the artifacts for the specified run
echo "Fetching and downloading artifacts for run $RUN_ID ..."

# Download only artifacts starting with "e2e-tests-reports-shard-"
gh run download "$RUN_ID" -R "$REPO_OWNER/$REPO_NAME" --dir "$DESTINATION_DIR/artifacts"

# Clean up the existing screenshots
echo "Cleaning up existing screenshots in $DESTINATION_DIR ..."
rm -f "$DESTINATION_DIR/*.png"

# Move only the screenshots
echo "Moving screenshots to $DESTINATION_DIR ..."
find "$DESTINATION_DIR" -type f -name "the_page_*.png" -exec mv {} "$DESTINATION_DIR" \;

# Remove the artifacts folder
echo "Cleaning up artifacts folder ..."
rm -rf "$DESTINATION_DIR/artifacts"

cd "$DESTINATION_DIR" || exit;

# Define the prefixes to remove
prefix1="the_page_should_match_or_creates_the_missing_snapshot_with_name_"
prefix2="the_page_creates_the_missing_snapshot_with_name_"

echo "Renaming screenshots ..."

# Loop through all PNG files in the current directory
for filename in *.png; do
    if [[ $filename == ${prefix1}* ]]; then
        # Remove the prefix
        new_filename=${filename#"$prefix1"}
    elif [[ $filename == ${prefix2}* ]]; then
        # Remove the prefix
        new_filename=${filename#"$prefix2"}
    else
        # Skip files that do not match the prefixes
        continue
    fi

    # Remove the trailing number if it exists
    new_filename=$(echo "$new_filename" | sed -E "s/__[0-9]+//")

    # Replace underscores with spaces
    new_filename=$(echo "$new_filename" | tr '_' ' ')

    # Rename the file
    mv "$filename" "$new_filename"
done

echo "✅ Done. Screenshots are available in $DESTINATION_DIR."