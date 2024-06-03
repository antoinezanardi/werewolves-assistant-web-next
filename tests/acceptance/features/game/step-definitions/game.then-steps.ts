import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { waitForPageUrl } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the user should be on game page with any id$/u, async function(this: CustomWorld): Promise<void> {
  await waitForPageUrl(this, "/game/*");
});

Then(/^the game's current play title should be "(?<name>.+?)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByRole("heading", { name, exact: true })).toBeVisible();
});

Then(/^the game's current play question should be "(?<name>.+?)"$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByRole("heading", { name, exact: true })).toBeVisible();
});