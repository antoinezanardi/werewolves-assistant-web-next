import { fileURLToPath } from "node:url";

import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import { I18N_TEST_LOCALE } from "~/modules/i18n/i18n.constants";
import { generateScreenshotOnScenarioFailure, removeAcceptanceTestsReportsScreenshotsDirectory } from "~/tests/acceptance/features/support/helpers/hooks.helpers";
import { WEREWOLVES_ASSISTANT_SANDBOX_API_BASE_URL } from "~/tests/acceptance/shared/constants/werewolves-assistant-sandbox-api.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

const { beforeEach, afterEach, afterAll, setup } = createTest({
  runner: "cucumber",
  server: true,
  rootDir: fileURLToPath(new URL("../../../..", import.meta.url)),
  nuxtConfig: {
    runtimeConfig: {
      public: {
        defaultLocale: I18N_TEST_LOCALE,
        werewolvesAssistantApi: { baseUrl: WEREWOLVES_ASSISTANT_SANDBOX_API_BASE_URL },
      },
    },
  },
});

const beforeAllTimeout = 60000;

BeforeAll({ timeout: beforeAllTimeout }, async(): Promise<void> => {
  removeAcceptanceTestsReportsScreenshotsDirectory();
  await setup();
});

Before({}, async function(this: CustomWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
  this.context = this.page.context();
});

After({}, async function(this: CustomWorld, scenario: ITestCaseHookParameter): Promise<void> {
  afterEach();
  if (scenario.result?.status === Status.FAILED) {
    await generateScreenshotOnScenarioFailure(this, scenario);
  }
  await Promise.all([
    this.page.close(),
    this.context.close(),
  ]);
});

AfterAll(async(): Promise<void> => {
  await afterAll();
});