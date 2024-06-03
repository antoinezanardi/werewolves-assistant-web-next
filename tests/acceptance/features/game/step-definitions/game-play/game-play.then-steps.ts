import { type DataTable, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the game's current play should have the following targets$/u, async function(this: CustomWorld, dataTable: DataTable): Promise<void> {
  const targets = dataTable.hashes();

  await Promise.all(targets.map(async target => expect(this.page.getByTestId(`game-playground-player-card-${target.name}`).first()).toBeVisible()));
});