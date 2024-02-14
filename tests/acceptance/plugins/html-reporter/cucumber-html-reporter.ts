import reporter from "cucumber-html-reporter";

reporter.generate({
  theme: "bootstrap",
  jsonFile: "tests/acceptance/reports/report.json",
  output: "tests/acceptance/reports/report.html",
  reportSuiteAsScenarios: true,
  launchReport: false,
  name: "Werewolves Assistant Web App",
  brandTitle: "Acceptance Test Report",
  columnLayout: 1,
  scenarioTimestamp: true,
  screenshotsDirectory: "tests/acceptance/reports/screenshots/",
  storeScreenshots: true,
});