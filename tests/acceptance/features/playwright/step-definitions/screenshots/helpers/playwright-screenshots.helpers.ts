import { encode as encodeJpeg } from "jpeg-js";
import type { Page } from "playwright-core";

import { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/constants/playwright-screenshots.constants";
import { ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH } from "~/tests/acceptance/shared/constants/acceptance.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function saveFullPageScreenshot(page: Page, screenshotName: string): Promise<void> {
  const screenshotPath = `${ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH}/${screenshotName}.jpeg`;
  console.info(`The snapshot with name "${screenshotName}" does not exist. Creating a new snapshot.`);
  await page.screenshot({
    path: screenshotPath,
    ...DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS,
  });
}

function attachDiffScreenshotAndThrowError(world: CustomWorld, diffScreenshot: { width: number; height: number; data: Buffer }, name: string): void {
  const diffJpeg = encodeJpeg(diffScreenshot);
  world.attach(diffJpeg.data, "image/png");
  throw new Error(`The snapshot with name "${name}" does not match the expected screenshot.`);
}

export {
  saveFullPageScreenshot,
  attachDiffScreenshotAndThrowError,
};