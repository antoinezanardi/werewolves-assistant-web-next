import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

async function pickPlayersInGroupOrganizer(world: CustomWorld, playerNames: string[]): Promise<void> {
  for (const playerName of playerNames) {
    const name = `Pick player with name "${playerName}"`;
    await world.page.getByRole("option", { name, exact: true }).click();
  }
}

async function setPlayersInSecondGroupInGroupOrganizer(world: CustomWorld, playerNames: string[]): Promise<void> {
  await pickPlayersInGroupOrganizer(world, playerNames);
  await world.page.getByLabel("Move to Target", { exact: true }).click();
}

async function setPlayersInFirstGroupInGroupOrganizer(world: CustomWorld, playerNames: string[]): Promise<void> {
  await pickPlayersInGroupOrganizer(world, playerNames);
  await world.page.getByLabel("Move to Source", { exact: true }).click();
}

async function editGroupNameInGroupOrganizer(world: CustomWorld, oldName: string, newName: string): Promise<void> {
  await world.page.getByRole("button", { name: `Edit group name "${oldName}"`, exact: true }).click();
  await world.page.getByLabel("Group name", { exact: true }).fill(newName);
  await world.page.getByLabel("Submit updated group name", { exact: true }).click();
}

export {
  setPlayersInSecondGroupInGroupOrganizer,
  setPlayersInFirstGroupInGroupOrganizer,
  editGroupNameInGroupOrganizer,
};