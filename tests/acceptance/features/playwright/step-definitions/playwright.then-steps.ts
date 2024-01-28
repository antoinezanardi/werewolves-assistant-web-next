import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>.+) with name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeVisible();
});

Then(/^the (?<role>.+) with name "(?<name>.+)" should have the following attributes$/u, async function(this: CustomWorld, role: LocatorRole, name: string, attributesDatatable: DataTable): Promise<void> {
  const element = this.page.getByRole(role, { name });
  const promises = [];
  for (const [attribute, value] of attributesDatatable.rows()) {
    promises.push(expect(element).toHaveAttribute(attribute, value));
  }
  await Promise.all(promises);
});

Then(/^the user should be on (?<page>.+) page$/u, function(this: CustomWorld, page: string): void {
  expect(this.page.url()).toBe(url(`/${page}`));
});