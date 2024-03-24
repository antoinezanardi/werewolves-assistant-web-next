import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

async function enterPlayerInLobby(world: CustomWorld, name: string): Promise<void> {
  const input = world.page.getByLabel("Player name");
  await input.waitFor({ state: "visible" });
  await input.fill(name);
  const addButton = world.page.getByRole("button", { name: "Add" });
  await addButton.waitFor({ state: "visible" });
  await addButton.click();
}

async function openRolePickerForPlayer(world: CustomWorld, name: string): Promise<void> {
  const buttonName = `Role image of the player ${name}`;
  const player = world.page.getByRole("button", { name: buttonName, exact: true });
  await player.waitFor({ state: "visible" });
  await player.click();
}

export { enterPlayerInLobby, openRolePickerForPlayer };