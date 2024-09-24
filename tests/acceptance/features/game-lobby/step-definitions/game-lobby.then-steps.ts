import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

import type { RoleName } from "~/composables/api/role/types/role.types";
import type { CustomWorld } from "@tests/acceptance/shared/types/word.types";

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

Then(/^the players positions coordinator button should be hidden in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Players positions" });

  await expect(button).toBeHidden();
});

Then(/^the players positions coordinator button should be visible in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Players positions" });

  await expect(button).toBeVisible();
});

Then(/^the game additional cards manager button should be hidden in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Additional cards" });

  await expect(button).toBeHidden();
});

Then(/^the game additional cards manager button should be visible in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Additional cards" });

  await expect(button).toBeVisible();
});

Then(/^the game group organizer button should be hidden in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Group organizer" });

  await expect(button).toBeHidden();
});

Then(/^the game group organizer button should be visible in the lobby$/u, async function(this: CustomWorld): Promise<void> {
  const button = this.page.getByRole("button", { name: "Group organizer" });

  await expect(button).toBeVisible();
});