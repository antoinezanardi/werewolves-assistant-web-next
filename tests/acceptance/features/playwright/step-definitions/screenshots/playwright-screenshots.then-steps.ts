import { existsSync, readFileSync } from "fs";
import { platform } from "os";

import { Then } from "@cucumber/cucumber";
import pixelMatch from "pixelmatch";
import { PNG } from "pngjs";

import { waitForPageLoadStates } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/constants/playwright-screenshots.constants";
import { saveFullPageScreenshot, throwErrorIfBrokenThreshold, tryScreenshotWithCorrectDimensions } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/helpers/playwright-screenshots.then-helpers";
import { ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH } from "~/tests/acceptance/shared/constants/acceptance.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

const screenshotStepTimeout = 30000;

Then(/^the page(?<shouldMatch> should match or)? creates the missing snapshot with name "(?<name>.+)"$/u, { timeout: screenshotStepTimeout }, async function(this: CustomWorld, shouldMatch: string | null, name: string): Promise<void> {
  if (process.env.SKIP_SCREENSHOTS_COMPARISON_TESTS === "true") {
    console.info("Skipping screenshot comparison because the environment variable SKIP_SCREENSHOTS_COMPARISON_TESTS is set to true.");

    return;
  }
  await waitForPageLoadStates(this);
  const screenshotPath = `${ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH}/${platform()}/${name}.png`;
  if (!existsSync(screenshotPath)) {
    const screenshot = PNG.sync.read(await this.page.screenshot(DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS));
    this.attach(PNG.sync.write(screenshot), "image/png");
    await saveFullPageScreenshot(this.page, screenshotPath);

    return;
  }
  if (shouldMatch === null) {
    return;
  }
  const screenshot = await tryScreenshotWithCorrectDimensions(this.page, PNG.sync.read(readFileSync(screenshotPath)));
  const baseScreenshot = PNG.sync.read(readFileSync(screenshotPath));
  const diffScreenshot = new PNG({
    width: baseScreenshot.width,
    height: baseScreenshot.height,
  });
  if (screenshot.width !== baseScreenshot.width || screenshot.height !== baseScreenshot.height) {
    this.attach(PNG.sync.write(screenshot), "image/png");
    throw new Error(`The screenshots have different dimensions. Expected: ${baseScreenshot.width}x${baseScreenshot.height}, but got: ${screenshot.width}x${screenshot.height}`);
  }
  const pixelDiff = pixelMatch(screenshot.data, baseScreenshot.data, diffScreenshot.data, screenshot.width, screenshot.height, { threshold: 0.1 });
  this.attach(PNG.sync.write(diffScreenshot), "image/png");
  throwErrorIfBrokenThreshold(pixelDiff, name);
});