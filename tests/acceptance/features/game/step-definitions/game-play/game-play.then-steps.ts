import { type DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the game's current play should have the following targets$/u, async function(this: CustomWorld, dataTable: DataTable): Promise<void> {
  const targets = dataTable.hashes();

  await Promise.all(targets.map(async target => expect(this.page.getByTestId(`game-playground-player-card-${target.name}`).first()).toBeEnabled()));
});

Then(/^the game's current play should have the following voters$/u, async function(this: CustomWorld, dataTable: DataTable): Promise<void> {
  const voters = dataTable.hashes();

  await Promise.all(voters.map(async voter => expect(this.page.getByTestId(`game-playground-player-card-${voter.name}`).first()).toBeVisible()));
});

Then(/^the game's current play should not have targets$/u, async function(this: CustomWorld): Promise<void> {
  await expect(this.page.getByRole("heading", { name: "Nobody can be targeted…", exact: true })).toBeVisible();
});

Then(/^the game's current play should not expect any action$/u, async function(this: CustomWorld): Promise<void> {
  await expect(this.page.getByRole("heading", { name: "No action needed, the game can proceed" })).toBeVisible();
});

Then(/^the witch should be out of potions$/u, async function(this: CustomWorld): Promise<void> {
  await expect(this.page.getByRole("heading", { name: "The Witch has used both potions, the game can proceed" })).toBeVisible();
});

Then(/^the following players can't be targeted in game's playground$/u, async function(this: CustomWorld, dataTable: DataTable): Promise<void> {
  const names = dataTable.hashes();

  await Promise.all(names.map(async player => {
    const targetCard = this.page.getByTestId(`game-playground-player-card-${player.name}`);
    const targetButton = targetCard.getByRole("button");

    return expect(targetButton).toBeDisabled();
  }));
});

Then(/^the game's current play should have a countdown of (?<minutes>\d+) minutes and (?<seconds>\d+) seconds$/u, async function(this: CustomWorld, minutes: string, seconds: string): Promise<void> {
  const maxSecondsLength = 2;
  const paddedSeconds = seconds.padStart(maxSecondsLength, "0");
  const expectedTime = `${minutes}:${paddedSeconds}`;

  await expect(this.page.getByText(expectedTime, { exact: true })).toBeVisible();
});