import type { DataTable } from "@cucumber/cucumber";
import { Given } from "@cucumber/cucumber";
import { createGame } from "@tests/acceptance/features/game/helpers/game.given-steps-helpers";
import { goOnPage } from "@tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Given(/^the user goes on an unknown game$/u, async function(this: CustomWorld): Promise<void> {
  await goOnPage(this, "/game/unknown-game");
});

Given(/^the user creates a game with 4 simple role players$/u, { timeout: 30000 }, async function(this: CustomWorld): Promise<void> {
  const playersWithRoles: [playerName: string, role: string][] = [
    ["Player 1", "Werewolf"],
    ["Player 2", "Werewolf"],
    ["Player 3", "Seer"],
    ["Player 4", "Villager"],
  ];
  await createGame(this, playersWithRoles);
});

Given(/^the user creates a game with the players with name and role$/u, { timeout: 30000 }, async function(this: CustomWorld, playersDatatable: DataTable): Promise<void> {
  const players = playersDatatable.rows() as [playerName: string, role: string][];
  await createGame(this, players);
});