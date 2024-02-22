import { Given } from "@cucumber/cucumber";
import { url } from "@nuxt/test-utils/e2e";

import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user goes on an unknown game$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.goto(url(`/game/unknown-game`));
  await this.page.waitForLoadState();
});

Given(/^the user creates a game with 4 random role players$/u, async function(this: CustomWorld): Promise<void> {
  await this.page.goto(url("/game-lobby"));
  await this.page.waitForLoadState();
  const players = ["Player 1", "Player 2", "Player 3", "Player 4"];
  for (const player of players) {
    const input = this.page.getByLabel("Player name");
    await input.waitFor({ state: "visible" });
    await input.fill(player);
    const addButton = this.page.getByRole("button", { name: "Add" });
    await addButton.waitFor({ state: "visible" });
    await addButton.click();
  }
  const randomCompositionButton = this.page.getByRole("button", { name: "Random composition" });
  await randomCompositionButton.waitFor({ state: "visible" });
  await randomCompositionButton.click();
  const startGameButton = this.page.getByRole("button", { name: "Start game" });
  await startGameButton.waitFor({ state: "visible" });
  await startGameButton.click();
  await this.page.waitForURL(url(`/game/*`));
  await this.page.waitForLoadState();
});