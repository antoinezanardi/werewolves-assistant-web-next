import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+)" should have the attribute seen by seer in the game$/u, async function(this: CustomWorld, name: string): Promise<void> {
  const gameTeamSidePlayerLocator = this.page.getByTestId(`game-team-side-player-${name}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });
  const seenBySeerAttribute = gameTeamSidePlayerLocator.getByRole("img", { name: "The Seer saw this player and thus knows his role.", exact: true });

  await expect(seenBySeerAttribute).toBeVisible();
});