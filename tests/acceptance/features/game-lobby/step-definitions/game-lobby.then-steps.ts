import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { RoleName } from "~/composables/api/role/types/role.types";
import type { CustomWorld } from "~/tests/acceptance/shared/types/word.types";

Then(/^the player with name "(?<name>.+?)" should be in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByTestId(`game-lobby-player-card-${name}`)).toBeVisible();
});

Then(/^the player with name "(?<name>.+?)" should not be in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByTestId(`game-lobby-player-card-${name}`)).toBeHidden();
});

Then(/^the player with name "(?<name>.+?)" should have a role in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByTestId(`game-lobby-player-card-${name}`)).not.toContainText("Role not selected");
});

Then(/^the player with name "(?<name>.+?)" should have the "(?<role>.+?)" role in the lobby$/u, async function(this: CustomWorld, name: string, role: RoleName): Promise<void> {
  await expect(this.page.getByTestId(`game-lobby-player-card-${name}`)).toContainText(role);
});

Then(/^the player with name "(?<name>.+?)" should not have a role in the lobby$/u, async function(this: CustomWorld, name: string): Promise<void> {
  await expect(this.page.getByTestId(`game-lobby-player-card-${name}`)).toContainText("Role not selected");
});