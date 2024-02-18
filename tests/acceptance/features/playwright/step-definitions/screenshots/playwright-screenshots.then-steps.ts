import { existsSync, readFileSync } from "fs";

import { Then } from "@cucumber/cucumber";
import { decode as decodeJpeg } from "jpeg-js";
import pixelMatch from "pixelmatch";

import { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/constants/playwright-screenshots.constants";
import { attachDiffScreenshotAndThrowError, saveFullPageScreenshot } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/helpers/playwright-screenshots.helpers";
import { ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH } from "~/tests/acceptance/shared/constants/acceptance.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the page should match the snapshot with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const screenshotPath = `${ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH}/${name}.jpeg`;
  if (!existsSync(screenshotPath)) {
    await saveFullPageScreenshot(this.page, name);

    return;
  }
  const baseScreenshot = decodeJpeg(readFileSync(screenshotPath));
  const diffScreenshot: typeof baseScreenshot = {
    width: baseScreenshot.width,
    height: baseScreenshot.height,
    data: new Buffer(baseScreenshot.data.length),
  };
  const screenshot = decodeJpeg(await this.page.screenshot(DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS));
  const pixelDiff = pixelMatch(screenshot.data, baseScreenshot.data, diffScreenshot.data, screenshot.width, screenshot.height);

  const maxPixelDiff = 200;
  if (pixelDiff > maxPixelDiff) {
    attachDiffScreenshotAndThrowError(this, diffScreenshot, name);
  }
});