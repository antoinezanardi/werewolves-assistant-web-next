import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" in navigation bar should be visible/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const navigationBar = this.page.getByRole("navigation", { name: "Navigation bar" });

  await expect(navigationBar.getByRole(role, { name })).toBeVisible();
});