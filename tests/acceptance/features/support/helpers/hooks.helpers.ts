import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import format from "html-format";
import { rimraf } from "rimraf";

import { ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH } from "~/tests/acceptance/shared/constants/acceptance.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

function removeAcceptanceTestsReportsScreenshotsDirectory(): void {
  const acceptanceTestsReportsDirectoryFilesPath = `${process.cwd()}/${ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH}`;
  console.info(`Removing reports directory content: "${acceptanceTestsReportsDirectoryFilesPath}"`);
  rimraf.sync(acceptanceTestsReportsDirectoryFilesPath);
}

async function generateScreenshotOnScenarioFailure(world: CustomWorld, scenario: ITestCaseHookParameter): Promise<void> {
  const screenShotExtension = ".png";
  const screenShotRelativePath = `${ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH}/${scenario.pickle.name}${screenShotExtension}`;
  const screenShot = await world.page.screenshot({
    path: screenShotRelativePath,
    fullPage: true,
  });
  world.attach(screenShot, "image/png");
  const screenShotFullPath = `${process.cwd()}/${screenShotRelativePath}`;
  console.error(`Screenshot for failure scenario: ${scenario.pickle.name} saved at: "${screenShotFullPath}"`);
}

async function printPageContentOnScenarioFailure(world: CustomWorld): Promise<void> {
  const pageContent = await world.page.innerHTML("#__nuxt");
  console.error(format(pageContent));
}

export {
  removeAcceptanceTestsReportsScreenshotsDirectory,
  printPageContentOnScenarioFailure,
  generateScreenshotOnScenarioFailure,
};