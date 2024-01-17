import { fileURLToPath } from "node:url";
import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { createPage, createTest } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

const { beforeEach, afterEach, afterAll, setup } = createTest({
  runner: "vitest",
  server: true,
  rootDir: fileURLToPath(new URL("../../../..", import.meta.url))
})

BeforeAll({ timeout: 60 * 1000 }, setup);

Before({}, async function (this: CustomWorld): Promise<void> {
  beforeEach();
  this.page = await createPage();
});

After((): void => {
  afterEach();
});

AfterAll((): void => {
  afterAll();
});
