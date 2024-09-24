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

export {
  setPlayersInSecondGroupInGroupOrganizer,
  setPlayersInFirstGroupInGroupOrganizer,
};