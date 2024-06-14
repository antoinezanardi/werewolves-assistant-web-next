import { When } from "@cucumber/cucumber";

import { clickOnRoleWithText, hoverOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { LocatorRole } from "@tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user clicks on the (?<role>button|link|menuitem|tab) with(?<isExact> exact)? name "(?<name>.+?)"$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  await clickOnRoleWithText(this, role, name, exact !== null);
});

When(/^the user hovers the (?<role>button|link|menuitem|tab) with(?<isExact> exact)? name "(?<name>.+?)"$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  await hoverOnRoleWithText(this, role, name, exact !== null);
});

When(/^the user clicks on the child (?<role>button|link|menuitem|tab) with name "(?<name>.+?)" under the (?<upperRole>button|img|heading|navigation|link|region|menu) with name "(?<upperName>.+)"$/u, async function(this: CustomWorld, role: LocatorRole, name: string, upperRole: LocatorRole, upperName: string): Promise<void> {
  const element = this.page.getByRole(upperRole, { name: upperName }).getByRole(role, { name });
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the user clicks on the element with text "(?<text>.+?)" under the (?<upperRole>button|img|heading|navigation|link|region|menu) with name "(?<upperName>.+)"$/u, async function(this: CustomWorld, text: string, upperRole: LocatorRole, upperName: string): Promise<void> {
  const element = this.page.getByRole(upperRole, { name: upperName }).getByText(text);
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the (?<role>.+) with(?<isExact> exact)? name "(?<name>.+)" is hidden$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;
  const element = this.page.getByRole(role, { name, exact: isExact });
  await element.waitFor({ state: "hidden" });
});

When(/^the user scrolls to the (?<role>button|img|heading|navigation|link|region) with(?<isExact> exact)? name "(?<name>.+)"$/u, async function(this: CustomWorld, role: LocatorRole, exact: string | null, name: string): Promise<void> {
  const isExact = exact !== null;
  const element = this.page.getByRole(role, { name, exact: isExact });
  await element.scrollIntoViewIfNeeded();
});

When(/^the user scrolls to the text "(?<text>.+)"$/u, async function(this: CustomWorld, text: string): Promise<void> {
  const element = this.page.getByText(text);
  await element.scrollIntoViewIfNeeded();
});