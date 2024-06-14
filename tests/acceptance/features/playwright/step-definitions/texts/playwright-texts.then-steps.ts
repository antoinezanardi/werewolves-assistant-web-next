import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { LocatorRole } from "@tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the text "(?<text>.+?)" under the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, text: string, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name }).getByText(text)).toBeVisible();
});

Then(/^the text "(?<text>.+?)" under the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be hidden$/u, async function(this: CustomWorld, text: string, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name }).getByText(text, { exact: true })).toBeHidden();
});