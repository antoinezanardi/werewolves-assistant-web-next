import { When } from "@cucumber/cucumber";

import type { LocatorRole } from "~/tests/acceptance/shared/types/playwright.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

When(/^the user clicks on the (?<role>.+) with name "(?<name>.+)"$/u, async function(this: CustomWorld, role: LocatorRole, name: string): Promise<void> {
  const element = this.page.getByRole(role, { name });
  await element.waitFor({ state: "visible" });
  await element.click();
});