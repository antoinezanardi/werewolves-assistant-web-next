import type { Page } from "playwright-core";
import { PNG } from "pngjs";

import { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/constants/playwright-screenshots.constants";

async function saveFullPageScreenshot(page: Page, screenshotPath: string): Promise<void> {
  console.info(`The snapshot with path "${screenshotPath}" does not exist. Creating a new snapshot.`);
  await page.screenshot({
    path: screenshotPath,
    ...DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS,
  });
}

async function tryScreenshotWithCorrectDimensions(page: Page, baseScreenshot: PNG): Promise<PNG> {
  const maxRetries = 10;
  const timeoutMs = 500;
  const screenshots: PNG[] = [];
  for (let i = 0; i < maxRetries; i++) {
    const screenshot = PNG.sync.read(await page.screenshot(DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS));
    screenshots.push(screenshot);
    if (screenshot.width === baseScreenshot.width && screenshot.height === baseScreenshot.height) {
      console.info(`The screenshot has the correct dimensions after ${i} retries`);

      return screenshot;
    }
    console.info(`The screenshot does not have the correct dimensions (${screenshot.width}x${screenshot.height}). Retrying in ${timeoutMs}ms...`);
    await new Promise(resolve => {
      setTimeout(resolve, timeoutMs);
    });
  }
  console.error(`The screenshot does not have the correct dimensions after ${maxRetries} retries`);

  return screenshots[screenshots.length - 1];
}

function throwErrorIfBrokenThreshold(pixelDiff: number, name: string): void {
  const maxPixelDiff = 500;
  console.info(`The pixel diff for snapshot with name "${name}" is ${pixelDiff} px`);
  if (pixelDiff > maxPixelDiff) {
    throw new Error(`The snapshot with name "${name}" does not match the expected screenshot because the pixel diff is ${pixelDiff} which is greater than the allowed ${maxPixelDiff} pixel diff threshold`);
  }
}

export {
  saveFullPageScreenshot,
  throwErrorIfBrokenThreshold,
  tryScreenshotWithCorrectDimensions,
};