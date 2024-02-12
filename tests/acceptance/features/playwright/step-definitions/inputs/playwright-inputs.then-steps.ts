import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the input with label "(?<label>.+?)" should be visible$/u, async function(this: CustomWorld, label: string): Promise<void> {
  await expect(this.page.getByLabel(label)).toBeVisible();
});

Then(/^the input with label "(?<label>.+?)" should be enabled$/u, async function(this: CustomWorld, label: string): Promise<void> {
  await expect(this.page.getByLabel(label)).toBeEnabled();
});

Then(/^the input with label "(?<label>.+?)" should be disabled$/u, async function(this: CustomWorld, label: string): Promise<void> {
  await expect(this.page.getByLabel(label)).toBeDisabled();
});

Then(/^the input with label "(?<label>.+?)" should be empty$/u, async function(this: CustomWorld, label: string): Promise<void> {
  await expect(this.page.getByLabel(label)).toBeEmpty();
});