import defaultConfig from "./stryker.conf.mjs";

const reporters = ["progress-append-only", "html"];

const dashboard = {
  project: "github.com/antoinezanardi/werewolves-assistant-web-next",
  baseUrl: "https://dashboard.stryker-mutator.io/api/reports",
  reportType: "full",
};
const version = process.env.VERSION;

if (process.env.STRYKER_DASHBOARD_API_KEY !== undefined) {
  reporters.push("dashboard");
}

if (process.env.VERSION !== undefined) {
  dashboard.version = version;
}

export default {
  ...defaultConfig,
  dryRunTimeoutMinutes: 10,
  reporters,
  dashboard,
};