import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import { waitForPageUrl } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the user should be on (?<page>.+) page$/u, async function(this: CustomWorld, page: string): Promise<void> {
  const pageName = page === "home" ? "" : page;
  await waitForPageUrl(this, `/${pageName}`);
});

Then(/^a new page should be opened with url starting with "(?<url>.+)"$/u, async function(this: CustomWorld, fullUrl: string): Promise<void> {
  const newPage = await this.newPagePromise;
  const regexp = new RegExp(`^${fullUrl}`, "u");

  await expect(newPage).toHaveURL(regexp);
});

Then(/^the page should have head title "(?<title>.+)" and meta tags$/u, async function(this: CustomWorld, title: string, metaTagsDatable: DataTable): Promise<void> {
  await expect(this.page).toHaveTitle(title);

  const assertions: Promise<void>[] = [];
  for (const [attribute, content] of metaTagsDatable.rows()) {
    const metaTag = this.page.locator(`head > meta[name="${attribute}"]`);
    assertions.push(expect(metaTag).toHaveAttribute("content", content));
  }
  await Promise.all(assertions);
});