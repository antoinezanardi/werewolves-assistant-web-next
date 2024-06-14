import reporter from "cucumber-html-reporter";

import { ACCEPTANCE_TESTS_REPORTS_PATH, ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH } from "@tests/acceptance/shared/constants/acceptance.constants";

reporter.generate({
  theme: "bootstrap",
  jsonFile: `${ACCEPTANCE_TESTS_REPORTS_PATH}/report.json`,
  output: `${ACCEPTANCE_TESTS_REPORTS_PATH}/index.html`,
  reportSuiteAsScenarios: true,
  launchReport: false,
  name: "Werewolves Assistant Web App",
  brandTitle: "Acceptance Test Report",
  columnLayout: 1,
  scenarioTimestamp: true,
  screenshotsDirectory: ACCEPTANCE_TESTS_REPORTS_SCREENSHOTS_PATH,
  storeScreenshots: true,
});