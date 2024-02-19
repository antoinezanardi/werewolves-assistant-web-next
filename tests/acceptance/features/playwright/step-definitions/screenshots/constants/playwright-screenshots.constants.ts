import type { PageScreenshotOptions } from "playwright-core";

const DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS: PageScreenshotOptions = {
  fullPage: true,
  type: "png",
};

export { DEFAULT_PLAYWRIGHT_PAGE_SCREENSHOT_OPTIONS };