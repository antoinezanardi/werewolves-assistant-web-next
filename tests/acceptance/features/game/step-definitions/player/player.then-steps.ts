import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";
import type { RoleSide } from "~/composables/api/role/types/role.types";

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

Then(/^the player with name "(?<name>.+)" should have his role hidden in the game$/u, async function(this: CustomWorld, playerName: string): Promise<void> {
  const gameTeamSidePlayerLocator = this.page.getByTestId(`game-team-side-player-${playerName}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });
  const revealedRoleImage = gameTeamSidePlayerLocator.getByRole("img", { name: "This player's role is revealed", exact: true });

  await expect(revealedRoleImage).toBeHidden();
});

Then(/^the player with name "(?<name>.+)" should have his role revealed in the game$/u, async function(this: CustomWorld, playerName: string): Promise<void> {
  const gameTeamSidePlayerLocator = this.page.getByTestId(`game-team-side-player-${playerName}`).first();
  await gameTeamSidePlayerLocator.waitFor({ state: "visible" });
  const revealedRoleImage = gameTeamSidePlayerLocator.getByRole("img", { name: "This player's role is revealed", exact: true });

  await expect(revealedRoleImage).toBeVisible();
});

Then(/^the player with name "(?<name>.+)" should be in the (?<side>villagers|werewolves) side in the game$/u, async function(this: CustomWorld, playerName: string, side: RoleSide): Promise<void> {
  const testIdSideLocator = side === "villagers" ? "villagers-side" : "werewolves-side";
  const sideLocator = this.page.getByTestId(testIdSideLocator);
  const gameTeamSidePlayerLocator = sideLocator.getByTestId(`game-team-side-player-${playerName}`).first();

  await expect(gameTeamSidePlayerLocator).toBeVisible();
});