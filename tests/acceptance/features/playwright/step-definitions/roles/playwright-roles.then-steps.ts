import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeVisible();
});

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be hidden$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeHidden();
});

Then(/^the (?<role>button) with name "(?<name>.+)" should be disabled$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeDisabled();
});

Then(/^the (?<role>button) with name "(?<name>.+)" should be enabled$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeEnabled();
});

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should have the following attributes$/u, async function(this: CustomWorld, role: LocatorRole, name: string, attributesDatatable: DataTable): Promise<void> {
  const element = this.page.getByRole(role, { name });
  const promises = [];
  for (const [attribute, value] of attributesDatatable.rows()) {
    promises.push(expect(element).toHaveAttribute(attribute, value));
  }
  await Promise.all(promises);
});