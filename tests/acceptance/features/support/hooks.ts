import { fileURLToPath } from "node:url";

import format from "html-format";
import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import type { ITestCaseHookParameter } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import { I18N_TEST_LOCALE } from "~/modules/i18n/i18n.constants";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

const { beforeEach, afterEach, afterAll, setup } = createTest({
  runner: "cucumber",
  server: true,
  rootDir: fileURLToPath(new URL("../../../..", import.meta.url)),
  nuxtConfig: {
    runtimeConfig: {
      public: {
        defaultLocale: I18N_TEST_LOCALE,
        werewolvesAssistantApi: { baseUrl: "http://127.0.0.1:9090/" },
      },
    },
  },
});

const beforeAllTimeout = 60000;

BeforeAll({ timeout: beforeAllTimeout }, async(): Promise<void> => {
  await setup();
});

Before({}, async function(this: CustomWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
  this.context = this.page.context();
});

After({}, async function(this: CustomWorld, scenario: ITestCaseHookParameter): Promise<void> {
  afterEach();
  if (scenario.result?.status !== Status.PASSED) {
    const pageContent = await this.page.innerHTML("#__nuxt");
    console.error(format(pageContent));
  }
  await Promise.all([
    this.page.close(),
    // this.context.close(),
  ]);
});

AfterAll(async(): Promise<void> => {
  await afterAll();
});