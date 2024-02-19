import { existsSync, readFileSync } from "fs";

import { Then } from "@cucumber/cucumber";
import { PNG } from "pngjs";
import type { PixelmatchOptions } from "pixelmatch";
import pixelMatch from "pixelmatch";

import { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/constants/playwright-screenshots.constants";
import { throwErrorIfBrokenThreshold, saveFullPageScreenshot } from "~/tests/acceptance/features/playwright/step-definitions/screenshots/helpers/playwright-screenshots.helpers";
import { ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH } from "~/tests/acceptance/shared/constants/acceptance.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the page should match the snapshot with name "(?<name>.+)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const screenshotPath = `${ACCEPTANCE_TESTS_PATH_SCREENSHOTS_PATH}/${process.platform}/${name}.png`;
  const screenshot = PNG.sync.read(await this.page.screenshot(DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS));
  if (!existsSync(screenshotPath)) {
    this.attach(PNG.sync.write(screenshot), "image/png");
    await saveFullPageScreenshot(this.page, screenshotPath);

    return;
  }
  const baseScreenshot = PNG.sync.read(readFileSync(screenshotPath));
  const diffScreenshot = new PNG({
    width: baseScreenshot.width,
    height: baseScreenshot.height,
  });
  const pixelMatchOptions: PixelmatchOptions = { threshold: 0.5 };
  const pixelDiff = pixelMatch(screenshot.data, baseScreenshot.data, diffScreenshot.data, screenshot.width, screenshot.height, pixelMatchOptions);

  this.attach(PNG.sync.write(diffScreenshot), "image/png");
  throwErrorIfBrokenThreshold(this, pixelDiff, name);
});