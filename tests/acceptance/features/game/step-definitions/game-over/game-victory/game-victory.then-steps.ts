import type { DataTable } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

Then(/^the game should be over with title "(?<title>.+?)" and subtitle "(?<subTitle>.+?)"$/u, async function(this: CustomWorld, title: string, subTitle: string): Promise<void> {
  await Promise.all([
    expect(this.page.getByRole("heading", { name: title, exact: true })).toBeVisible(),
    expect(this.page.getByRole("heading", { name: subTitle, exact: true })).toBeVisible(),
  ]);
});

Then(/^the game winners should be the players$/u, async function(this: CustomWorld, playerNamesDatatable: DataTable): Promise<void> {
  const playerNames = playerNamesDatatable.rows().map(([name]) => name);
  const winnersList = this.page.getByTestId("game-over-winners");
  for (const name of playerNames) {
    await expect(winnersList.getByText(name, { exact: true })).toBeVisible();
  }
});

Then(/^the game winners should have no winners$/u, async function(this: CustomWorld): Promise<void> {
  await expect(this.page.getByTestId("game-over-no-winners")).toBeHidden();
});