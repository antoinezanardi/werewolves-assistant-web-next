import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user types "(?<text>.+?)" in the input with label "(?<label>.+)"$/u, async function(this: CustomWorld, text: string, label: string): Promise<void> {
  const input = this.page.getByLabel(label);
  await input.waitFor({ state: "visible" });
  await input.fill(text);
});