import { fileURLToPath } from "node:url";

import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

const { beforeEach, afterEach, afterAll, setup } = createTest({
  runner: "cucumber",
  server: true,
  rootDir: fileURLToPath(new URL("../../../..", import.meta.url)),
});

const beforeAllTimeout = 60000;

BeforeAll({ timeout: beforeAllTimeout }, async(): Promise<void> => {
  await setup();
});

Before({}, async function(this: CustomWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
});

After((): void => {
  afterEach();
});

AfterAll(async(): Promise<void> => {
  await afterAll();
});