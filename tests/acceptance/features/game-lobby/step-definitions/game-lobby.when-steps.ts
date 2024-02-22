import { When } from "@cucumber/cucumber";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

When(/^the user enters the player with name "(?<name>.+?)" in game lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const input = this.page.getByLabel("Player name");
  await input.waitFor({ state: "visible" });
  await input.fill(name);
  const addButton = this.page.getByRole("button", { name: "Add" });
  await addButton.waitFor({ state: "visible" });
  await addButton.click();
});