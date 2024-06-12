import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+)" should be alive in the game$/u, async function(this: CustomWorld, playerName: string): Promise<void> {
  const gameTeamSidePlayerLocator = this.page.getByTestId(`game-team-side-player-${playerName}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });
  const deadImage = gameTeamSidePlayerLocator.getByRole("img", { name: "This player is dead", exact: true });

  await expect(deadImage).toBeHidden();
});

Then(/^the player with name "(?<name>.+)" should be dead in the game$/u, async function(this: CustomWorld, playerName: string): Promise<void> {
  const gameTeamSidePlayerLocator = this.page.getByTestId(`game-team-side-player-${playerName}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });
  const deadImage = gameTeamSidePlayerLocator.getByRole("img", { name: "This player is dead", exact: true });

  await expect(deadImage).toBeVisible();
});