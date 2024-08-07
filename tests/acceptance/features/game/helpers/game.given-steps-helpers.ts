import { createGameInLobby, enterPlayerInLobby, enterPlayerWithRoleInLobby, generateRandomCompositionInLobby } from "@tests/acceptance/features/game-lobby/helpers/game-lobby.when-steps-helpers";
import { goOnPage, waitForPageUrl } from "@tests/acceptance/features/playwright/helpers/pages/playwright-pages.given-steps-helper";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function createGameWithRandomComposition(world: CustomWorld, playerNames: string[]): Promise<void> {
  await goOnPage(world, "/game-lobby");
  for (const playerName of playerNames) {
    await enterPlayerInLobby(world, playerName);
  }
  await generateRandomCompositionInLobby(world);
  await createGameInLobby(world);
  await waitForPageUrl(world, "/game/*");
}

async function createGame(world: CustomWorld, playersNameAndRole: [playerName: string, role: string][]): Promise<void> {
  await goOnPage(world, "/game-lobby");
  for (const [playerName, role] of playersNameAndRole) {
    await enterPlayerWithRoleInLobby(world, playerName, role);
  }
  await createGameInLobby(world);
  await waitForPageUrl(world, "/game/*");
}

export {
  createGameWithRandomComposition,
  createGame,
};