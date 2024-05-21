import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>button|img|heading|navigation|link|region|paragraph|tab) with(?<isExact> exact)? name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;

  await expect(this.page.getByRole(role, { name, exact: isExact })).toBeVisible();
});

Then(/^the (?<role>button|img|heading|navigation|link|region|tab) with(?<isExact> exact)? name "(?<name>.+)" should be in viewport$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;

  await expect(this.page.getByRole(role, { name, exact: isExact })).toBeInViewport();
});

Then(/^the (?<role>button|img|heading|navigation|link|region|tab) with(?<isExact> exact)? name "(?<name>.+)" should be hidden$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;

  await expect(this.page.getByRole(role, { name, exact: isExact })).toBeHidden();
});

Then(/^the (?<role>button) with(?<isExact> exact)? name "(?<name>.+)" should be disabled$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;

  await expect(this.page.getByRole(role, { name, exact: isExact })).toBeDisabled();
});

Then(/^the (?<role>button) with(?<isExact> exact)? name "(?<name>.+)" should be enabled$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;

  await expect(this.page.getByRole(role, { name, exact: isExact })).toBeEnabled();
});

Then(/^the (?<role>button|img|heading|navigation|link|region) with name(?<isExact> exact)? "(?<name>.+)" should have the following attributes$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string, attributesDatatable: DataTable): Promise<void> {
  const isExact = exact !== null;
  const element = this.page.getByRole(role, { name, exact: isExact });
  const promises = [];
  for (const [attribute, value] of attributesDatatable.rows()) {
    promises.push(expect(element).toHaveAttribute(attribute, value));
  }

  await Promise.all(promises);
});