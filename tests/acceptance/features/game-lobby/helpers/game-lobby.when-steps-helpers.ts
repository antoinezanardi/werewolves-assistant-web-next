import { chooseRoleInLobbyRolePicker } from "@tests/acceptance/features/game-lobby/helpers/game-lobby-role-picker/game-lobby-role-picker.when-steps-helpers";
import { clickOnRoleWithText } from "@tests/acceptance/features/playwright/helpers/roles/playwright-roles.when-steps-helpers";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function enterPlayerInLobby(world: CustomWorld, name: string): Promise<void> {
  const input = world.page.getByLabel("Player name");
  await input.waitFor({ state: "visible" });
  await input.fill(name);
  const addButton = world.page.getByRole("button", { name: "+ Add" });
  await addButton.waitFor({ state: "visible" });
  await addButton.click();
}

async function openRolePickerForPlayer(world: CustomWorld, name: string): Promise<void> {
  const buttonName = `Role image of the player ${name}`;
  const player = world.page.getByRole("button", { name: buttonName });
  await player.waitFor({ state: "visible" });
  await player.click();
}

async function openAdditionalCardsManager(world: CustomWorld): Promise<void> {
  await clickOnRoleWithText(world, "button", "Additional cards");
}

async function enterPlayerWithRoleInLobby(world: CustomWorld, name: string, roleName: string): Promise<void> {
  await enterPlayerInLobby(world, name);
  await openRolePickerForPlayer(world, name);
  await chooseRoleInLobbyRolePicker(world, roleName);
  await clickOnRoleWithText(world, "button", "Pick role for the player", true);
}

async function generateRandomCompositionInLobby(world: CustomWorld): Promise<void> {
  const randomCompositionButton = world.page.getByRole("button", { name: "Random composition" });
  await randomCompositionButton.waitFor({ state: "visible" });
  await randomCompositionButton.click();
}

async function createGameInLobby(world: CustomWorld): Promise<void> {
  const startGameButton = world.page.getByRole("button", { name: "Start game" });
  await startGameButton.waitFor({ state: "visible" });
  await startGameButton.click();
  const confirmStartGameButton = world.page.getByRole("button", { name: "Let's go!" }).or(world.page.getByRole("button", { name: "Skip and play now" }));
  await confirmStartGameButton.waitFor({ state: "visible" });
  await confirmStartGameButton.click();
}

export {
  enterPlayerInLobby,
  openRolePickerForPlayer,
  openAdditionalCardsManager,
  enterPlayerWithRoleInLobby,
  generateRandomCompositionInLobby,
  createGameInLobby,
};