import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user types "(?<text>.+?)" in the input with(?<isExact> exact)? label "(?<label>.+)"$/u, async function(
  this: CustomWorld,
  text: string, exact: string | null,
  label: string,
): Promise<void> {
  const isExact = exact !== null;
  const input = this.page.getByLabel(label, { exact: isExact });
  await input.waitFor({ state: "visible" });
  await input.fill(text);
});

When(/^the user types "(?<text>.+?)" in the input with locator "(?<locator>.+)"$/u, async function(this: CustomWorld, text: string, locator: string): Promise<void> {
  const input = this.page.locator(locator);
  await input.waitFor({ state: "visible" });
  await input.fill(text);
});