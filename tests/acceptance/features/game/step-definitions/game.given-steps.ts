import type { DataTable } from "@cucumber/cucumber";
import { Given } from "@cucumber/cucumber";

import type { RoleName } from "~/composables/api/role/types/role.types";
import { createGame, createGameWithRandomComposition } from "~/tests/acceptance/features/game/helpers/game.given-steps-helpers";
import { goOnPage } from "~/tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Given(/^the user goes on an unknown game$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game/unknown-game");
});

Given(/^the user creates a game with 4 random role players$/u, async function(this: CustomWorld): Promise<void> {
  const players = ["Player 1", "Player 2", "Player 3", "Player 4"];
  await createGameWithRandomComposition(this, players);
});

Given(/^the user creates a game with the players with name and role$/u, { timeout: 30000 }, async function(this: CustomWorld, playersDatatable: DataTable): Promise<void> {
  const players = playersDatatable.rows() as [playerName: string, role: RoleName][];
  await createGame(this, players);
});