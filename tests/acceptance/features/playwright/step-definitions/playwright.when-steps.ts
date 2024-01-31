import { When } from "@cucumber/cucumber";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

When(/^the user clicks on the (?<role>button|link|menuitem) with name "(?<name>.+?)"$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const element = this.page.getByRole(role, { name });
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the user clicks on the child (?<role>button|link|menuitem) with name "(?<name>.+?)" under the (?<upperRole>button|img|heading|navigation|link|region|menu) with name "(?<upperName>.+)"$/u, async function(this: CustomWorld, role: LocatorRole, name: string, upperRole: LocatorRole, upperName: string): Promise<void> {
  const element = this.page.getByRole(upperRole, { name: upperName }).getByRole(role, { name });
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the user clicks on the element with text "(?<text>.+?)" under the (?<upperRole>button|img|heading|navigation|link|region|menu) with name "(?<upperName>.+)"$/u, async function(this: CustomWorld, text: string, upperRole: LocatorRole, upperName: string): Promise<void> {
  const element = this.page.getByRole(upperRole, { name: upperName }).getByText(text);
  await element.waitFor({ state: "visible" });
  await element.click();
});

When(/^the (?<role>.+) with name "(?<name>.+)" is hidden$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const element = this.page.getByRole(role, { name });
  await element.waitFor({ state: "hidden" });
});