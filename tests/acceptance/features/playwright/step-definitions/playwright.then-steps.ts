import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";
import { expect } from "@playwright/test";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeVisible();
});

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be hidden$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name })).toBeHidden();
});

Then(/^the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should have the following attributes$/u, async function(this: CustomWorld, role: LocatorRole, name: string, attributesDatatable: DataTable): Promise<void> {
  const element = this.page.getByRole(role, { name });
  const promises = [];
  for (const [attribute, value] of attributesDatatable.rows()) {
    promises.push(expect(element).toHaveAttribute(attribute, value));
  }
  await Promise.all(promises);
});

Then(/^the text "(?<text>.+?)" under the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be visible$/u, async function(this: CustomWorld, text: string, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name }).getByText(text)).toBeVisible();
});

Then(/^the text "(?<text>.+?)" under the (?<role>button|img|heading|navigation|link|region) with name "(?<name>.+)" should be hidden$/u, async function(this: CustomWorld, text: string, role: LocatorRole, name: string): Promise<void> {
  await expect(this.page.getByRole(role, { name }).getByText(text, { exact: true })).toBeHidden();
});

Then(/^the user should be on (?<page>.+) page$/u, async function(this: CustomWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;
  await this.page.waitForURL(url(`/${pageName}`));

  expect(this.page.url()).toBe(url(`/${pageName}`));
});

Then(/^a new page should be opened with url "(?<url>.+)"$/u, async function(this: CustomWorld, fullUrl: string): Promise<void> {
  const newPage = await this.newPagePromise;
  await newPage.waitForLoadState();

  expect(newPage.url()).toBe(fullUrl);
});