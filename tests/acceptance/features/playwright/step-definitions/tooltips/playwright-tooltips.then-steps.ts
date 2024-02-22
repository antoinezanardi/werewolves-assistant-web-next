import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the tooltip with text "(?<text>.+)" should be visible$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByRole("tooltip", { name, exact: true })).toBeVisible();
});

Then(/^the tooltip with text "(?<text>.+)" should be hidden$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByRole("tooltip", { name, exact: true })).toBeHidden();
});