import { When } from "@cucumber/cucumber";

import { fillInputWithLabel, fillInputWithLocator } from "@tests/acceptance/features/playwright/helpers/inputs/playwright-inputs.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user types "(?<text>.+?)" in the input with(?<isExact> exact)? label "(?<label>.+)"$/u, async function(
  this: CustomWorld,
  text: string, exact: string | null,
  label: string,
): Promise<void> {
  const isExact = exact !== null;
  await fillInputWithLabel(this, label, text, isExact);
});

When(/^the user types "(?<text>.+?)" in the input with locator "(?<locator>.+)"$/u, async function(this: CustomWorld, text: string, locator: string): Promise<void> {
  await fillInputWithLocator(this, locator, text);
});