import type { DataTable } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";

import type { RoleName } from "~/composables/api/role/types/role.types";
import { createGameInLobby, enterPlayerInLobby, enterPlayerWithRoleInLobby, generateRandomCompositionInLobby, openRolePickerForPlayer } from "@tests/acceptance/features/game-lobby/helpers/game-lobby.when-steps-helpers";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

When(/^the user enters the player with name "(?<name>.+?)" in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await enterPlayerInLobby(this, name);
});

When(/^the user clicks on the player with name "(?<name>.+?)" in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await openRolePickerForPlayer(this, name);
});

When(/^the user enters the players with name and role in the lobby$/u, { timeout: 45000 }, async function(this: CustomWorld, playersDatatable: DataTable): Promise<void> {
  const players = playersDatatable.rows();
  for (const [name, role] of players) {
    await enterPlayerWithRoleInLobby(this, name, role as RoleName);
  }
});

When(/^the user clicks on the game options button in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  await clickOnRoleWithText(this, "button", "Game options");
});

When(/^the user generates a random composition and starts the game in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  await generateRandomCompositionInLobby(this);
  await createGameInLobby(this);
});